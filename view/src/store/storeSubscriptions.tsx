import { RootState } from "./store";
import { Dispatch } from 'redux';
import { updatePomodoroCurrentTime } from "../api/pomodoro";

export const watchTimerModeChanges = (store: any) => (dispatch: Dispatch, getState: () => RootState) => {
    let previousTimerMode = getState().pomodoro.timer_mode;
    let previousSessionsRemaining = getState().pomodoro.sessions_remaining;
    let previousPomodoros = getState().pomodoro.pomodoros;
    
    // Subscribe to store changes
    const unsubscribeFromStoreChanges = store.subscribe(async () => {
        const currentTimerMode = getState().pomodoro.timer_mode;
        const currentSecondsLeft = getState().pomodoro.seconds_left;
        const currentSessionsRemaining = getState().pomodoro.sessions_remaining;
        const currentPomodoros = getState().pomodoro.pomodoros;
        // If timer_mode has changed, dispatch an API call to update the database
        if (currentTimerMode !== previousTimerMode) {
            // Call API here
            await updatePomodoroCurrentTime(
                currentSecondsLeft,
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
