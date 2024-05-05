import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PomodoroState } from "../types/types";
import { RootState } from "./store";

export const PomodoroSlice = createSlice({
    name: "pomodoro",
    initialState: {
        seconds_left: 1500,
        is_paused: true,
        work_mins: 25,
        break_mins: 5,
        long_break_mins: 15,
        num_sessions_to_long_break: 4,
        sessions_remaining: 4,
        timer_mode: "work",
        pomodoros: 0,
        pomodoro_price: 10,
        isLoading: true,
        seconds_offset: 0
    } as PomodoroState,
    reducers: {
        setPomodoro: (state, action: PayloadAction<PomodoroState>) => {
            return action.payload;
        },
        setWorkMinutes: (state, action: PayloadAction<number>) => {
            state.work_mins = action.payload;
        },
        setPomodoroFromLocalStorage: (state, action) => {
            const { 
                seconds_left, 
                work_mins, 
                break_mins,
                long_break_mins,
                sessions_remaining,
                timer_mode,
                pomodoros
            } = action.payload;
            state.seconds_left = seconds_left;
            state.work_mins = work_mins;
            state.break_mins = break_mins;
            state.long_break_mins = long_break_mins;
            state.sessions_remaining = sessions_remaining;
            state.timer_mode = timer_mode;
            state.pomodoros = pomodoros;
        },
        setBreakMinutes: (state, action: PayloadAction<number>) => {
            state.break_mins = action.payload;
        },
        setLongBreakMinutes: (state, action: PayloadAction<number>) => {
            state.long_break_mins = action.payload;
        },
        setNumOfSessionsToLongBreak: (state, action: PayloadAction<number>) => {
            const completedSessions = state.num_sessions_to_long_break - state.sessions_remaining;
            if (completedSessions >= action.payload) {
                state.sessions_remaining = action.payload;
            } else {
                state.sessions_remaining = action.payload - completedSessions;
            }
            state.num_sessions_to_long_break = action.payload;
            
        },
        play: (state) => {
            state.is_paused = false;
        },
        pause: (state) => {
            state.is_paused = true;
        },
        tick: (state) => {
            if (state.is_paused) {
                return;
            }
            if (state.seconds_left === 0) {
                state.is_paused = true;

                if (state.timer_mode === 'work' && state.sessions_remaining > 1) {
                    state.timer_mode = 'break';
                    state.seconds_left = state.break_mins * 60;
                    state.pomodoros = state.pomodoros + 1;
                    state.sessions_remaining = state.sessions_remaining - 1;
                } else if (state.timer_mode === "work" && state.sessions_remaining === 1) {
                    state.timer_mode = "longBreak";
                    state.seconds_left = state.long_break_mins * 60;
                    state.sessions_remaining = 0;
                    state.pomodoros = state.pomodoros + 1;
                } else if (state.timer_mode === "longBreak") {
                    state.timer_mode = "work";
                    state.seconds_left = state.work_mins * 60;
                    state.sessions_remaining = state.num_sessions_to_long_break;
                } else {
                    state.timer_mode = "work";
                    state.seconds_left = state.work_mins * 60;
                }
            } else {
                state.seconds_left = state.seconds_left - 1;
            }
        },
        reset: (state) => {
            state.is_paused = true;
            if (state.timer_mode === "work") {
                state.seconds_left = state.work_mins * 60;
            } else {
                state.seconds_left = state.break_mins * 60;
            }
        },
        skip: (state) => {
            state.is_paused = true;
            if (state.timer_mode === "work" && state.sessions_remaining > 1) {
                state.timer_mode = "break";
                state.seconds_left = state.break_mins * 60;
                state.sessions_remaining = state.sessions_remaining - 1;
            } else if (state.timer_mode === "work" && state.sessions_remaining === 1) {
                state.timer_mode = "longBreak";
                state.seconds_left = state.long_break_mins * 60;
                state.sessions_remaining = 0;
            } else if (state.timer_mode === "longBreak") {
                state.timer_mode = "work";
                state.seconds_left = state.work_mins * 60;
                state.sessions_remaining = state.num_sessions_to_long_break;
            } else {
                state.timer_mode = "work";
                state.seconds_left = state.work_mins * 60;
            }
        },
        setSellingPrice: (state, action: PayloadAction<number>) => {
            state.pomodoro_price = action.payload;
        },
        sellPomodoros: (state, action: PayloadAction<number>) => {
            state.pomodoros = state.pomodoros - action.payload;
        },
        setSecondsLeft: (state, action: PayloadAction<number>) => {
            state.seconds_left = action.payload;
        },
        setIsLoadingPomodoro: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setSecondsOffset: (state, action: PayloadAction<number>) => {
            state.seconds_offset = action.payload
        },
        addPomodoro: (state, action: PayloadAction<number>) => {
            state.pomodoros = action.payload;
        }
    }
})

export const {
    setPomodoro,
    setWorkMinutes,
    setBreakMinutes,
    setLongBreakMinutes,
    setNumOfSessionsToLongBreak,
    play,
    pause,
    tick,
    reset,
    skip,
    setSellingPrice,
    sellPomodoros,
    setSecondsLeft,
    setIsLoadingPomodoro,
    setSecondsOffset,
    addPomodoro,
    setPomodoroFromLocalStorage,
} = PomodoroSlice.actions

export const selectWorkMinutes = (state: RootState) => state.pomodoro.work_mins;
export const selectBreakMinutes = (state: RootState) => state.pomodoro.break_mins;
export const selectLongBreakMinutes = (state: RootState) => state.pomodoro.long_break_mins;
export const selectNumOfSessionsToLongBreak = (state: RootState) => state.pomodoro.num_sessions_to_long_break;
export const selectSessionsRemaining = (state: RootState) => state.pomodoro.sessions_remaining;
export const selectIsPaused = (state: RootState) => state.pomodoro.is_paused;
export const selectSecondsLeft = (state: RootState) => state.pomodoro.seconds_left;
export const selectPomodoros = (state: RootState) => state.pomodoro.pomodoros;
export const selectMode = (state: RootState) => state.pomodoro.timer_mode
export const selectPomodoroPrice = (state: RootState) => state.pomodoro.pomodoro_price;
export const selectPomodoroState = (state: RootState) => state.pomodoro;
export const selectIsLoadingPomodoro = (state: RootState) => state.pomodoro.isLoading;
export const selectSecondsOffset = (state: RootState) => state.pomodoro.seconds_offset

export default PomodoroSlice.reducer;