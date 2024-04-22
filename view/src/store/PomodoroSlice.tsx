import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PomodoroState } from "../types/types";
import { RootState } from "./store";

export const PomodoroSlice = createSlice({
    name: "pomodoro",
    initialState: {
        secondsLeft: 10,
        isPaused: true,
        mode: "work",
        workMinutes: 25,
        breakMinutes: 5,
        longBreakMinutes: 15,
        workMinutesQueued: null,
        breakMinutesQueued: null,
        longBreakMinutesQueued: null,
        numOfSessionsToLongBreak: 4,
        sessionsRemaining: 4,
        pomodoros: 10,
        pomodoroPrice: 10,
    } as PomodoroState,
    reducers: {
        setWorkMinutes: (state, action: PayloadAction<number>) => {
            state.workMinutesQueued = action.payload;
        },
        setBreakMinutes: (state, action: PayloadAction<number>) => {
            state.breakMinutesQueued = action.payload;
        },
        setLongBreakMinutes: (state, action: PayloadAction<number>) => {
            state.longBreakMinutesQueued = action.payload;
        },
        setNumOfSessionsToLongBreak: (state, action: PayloadAction<number>) => {
            const completedSessions = state.numOfSessionsToLongBreak - state.sessionsRemaining;
            state.numOfSessionsToLongBreak = action.payload;
            state.sessionsRemaining = action.payload - completedSessions;
        },
        play: (state) => {
            state.isPaused = false;
        },
        pause: (state) => {
            state.isPaused = true;
        },
        applyQueuedSettings: (state) => {
            if (state.workMinutesQueued && state.mode !== "work") {
                state.workMinutes = state.workMinutesQueued;
                state.workMinutesQueued = null;
            }
            if (state.breakMinutesQueued && state.mode !== "break") {
                state.breakMinutes = state.breakMinutesQueued;
                state.breakMinutesQueued = null;
            }
            if (state.longBreakMinutesQueued && state.mode !== "longBreak") {
                state.longBreakMinutes = state.longBreakMinutesQueued;
                state.longBreakMinutesQueued = null;
            }
        },
        applyQueuedSettingsAtReset: (state) => {
            if (state.workMinutesQueued) {
                state.workMinutes = state.workMinutesQueued;
                state.workMinutesQueued = null;
            }
            if (state.breakMinutesQueued) {
                state.breakMinutes = state.breakMinutesQueued;
                state.breakMinutesQueued = null;
            }
            if (state.longBreakMinutesQueued) {
                state.longBreakMinutes = state.longBreakMinutesQueued;
                state.longBreakMinutesQueued = null;
            }
        },
        tick: (state) => {
            if (state.isPaused) {
                return;
            }
            if (state.secondsLeft === 0) {
                state.isPaused = true;
                
                if (state.mode === 'work' && state.sessionsRemaining > 1) {
                    state.mode = 'break';
                    state.secondsLeft = state.breakMinutes * 60;
                    state.pomodoros = state.pomodoros + 1;
                    state.sessionsRemaining = state.sessionsRemaining - 1;
                } else if (state.mode === "work" && state.sessionsRemaining === 1) {
                    state.mode ="longBreak";
                    state.secondsLeft = state.longBreakMinutes * 60;
                    state.sessionsRemaining = 0;
                    state.pomodoros = state.pomodoros + 1;
                } else if (state.mode === "longBreak") {
                    state.mode = "work";
                    state.secondsLeft = state.workMinutes * 60;
                    state.sessionsRemaining = state.numOfSessionsToLongBreak;
                } else {
                    state.mode = "work";
                    state.secondsLeft = state.workMinutes * 60;
                }
            } else {
                state.secondsLeft = state.secondsLeft - 1;
            }
        },
        reset: (state) => {
            state.isPaused = true;
            if (state.mode === "work") {
                state.secondsLeft = state.workMinutes * 60;
            } else {
                state.secondsLeft = state.breakMinutes * 60;
            }
        },
        skip: (state) => {
            state.isPaused = true;
            if (state.mode === "work" && state.sessionsRemaining > 1) {
                state.mode = "break";
                state.secondsLeft = state.breakMinutes * 60;
                state.sessionsRemaining = state.sessionsRemaining - 1;
            } else if (state.mode === "work" && state.sessionsRemaining === 1) {
                state.mode = "longBreak";
                state.secondsLeft = state.longBreakMinutes * 60;
                state.sessionsRemaining = 0;
            } else if (state.mode === "longBreak") {
                state.mode = "work";
                state.secondsLeft = state.workMinutes * 60;
                state.sessionsRemaining = state.numOfSessionsToLongBreak;
            } else {
                state.mode = "work";
                state.secondsLeft = state.workMinutes * 60;
            }
        },
        setSellingPrice: (state, action: PayloadAction<number>) => {
            state.pomodoroPrice = action.payload;
        },
        sellPomodoros: (state, action: PayloadAction<number>) => {
            state.pomodoros = state.pomodoros - action.payload;
        }
    }
})

export const {
    setWorkMinutes,
    setBreakMinutes,
    setLongBreakMinutes,
    setNumOfSessionsToLongBreak,
    play,
    pause,
    applyQueuedSettings,
    applyQueuedSettingsAtReset,
    tick,
    reset,
    skip,
    setSellingPrice,
    sellPomodoros
} = PomodoroSlice.actions

export const selectWorkMinutes = (state: RootState) => state.pomodoro.workMinutes;
export const selectBreakMinutes = (state: RootState) => state.pomodoro.breakMinutes;
export const selectLongBreakMinutes = (state: RootState) => state.pomodoro.longBreakMinutes;
export const selectNumOfSessionsToLongBreak = (state: RootState) => state.pomodoro.numOfSessionsToLongBreak;
export const selectSessionsRemaining = (state: RootState) => state.pomodoro.sessionsRemaining;
export const selectIsPaused = (state: RootState) => state.pomodoro.isPaused;
export const selectSecondsLeft = (state: RootState) => state.pomodoro.secondsLeft;
export const selectPomodoros = (state: RootState) => state.pomodoro.pomodoros;
export const selectMode = (state: RootState) => state.pomodoro.mode
export const selectPomodoroPrice = (state: RootState) => state.pomodoro.pomodoroPrice;
export const selectWorkMinutesQueued = (state: RootState) => state.pomodoro.workMinutesQueued;
export const selectBreakMinutesQueued = (state: RootState) => state.pomodoro.breakMinutesQueued;
export const selectLongBreakMinutesQueued = (state: RootState) => state.pomodoro.longBreakMinutesQueued;

export default PomodoroSlice.reducer;