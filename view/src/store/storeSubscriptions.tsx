import { RootState } from "./store";
import { Dispatch } from 'redux';
import { updatePomodoroCurrentTime,  } from "../api/pomodoro";

export const watchTimerModeChanges = (store: any) => (dispatch: Dispatch, getState: () => RootState) => {
    let previousTimerMode = getState().pomodoro.timer_mode;
    const savedTimerState = localStorage.getItem('pomodoroTimerState');
    // Subscribe to store changes
   const unsubscribeFromStoreChanges = store.subscribe(async () => {
        const currentTimerMode = getState().pomodoro.timer_mode;
        const currentSecondsLeft = getState().pomodoro.seconds_left;
        const currentSessionsRemaining = getState().pomodoro.sessions_remaining;
        const currentPomodoros = getState().pomodoro.pomodoros;
        const currentIsPaused = getState().pomodoro.is_paused
        // If timer_mode has changed, dispatch an API call to update the database
        if (currentTimerMode !== previousTimerMode && !savedTimerState) {
            // Call API here
            await updatePomodoroCurrentTime(
                currentSecondsLeft,
                currentIsPaused,
                currentTimerMode,
                currentSessionsRemaining,
                currentPomodoros
            )
            // Update previousTimerMode after API call
            previousTimerMode = currentTimerMode;
        }
    });

    return unsubscribeFromStoreChanges;
};
