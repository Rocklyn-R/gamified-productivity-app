import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./TasksSlice";
import rewardsReducer from "./RewardsSlice";
import pomodoroReducer from "./PomodoroSlice";

export interface RootState {
    tasks: ReturnType<typeof tasksReducer>;
    rewards: ReturnType<typeof rewardsReducer>;
    pomodoro: ReturnType<typeof pomodoroReducer>;
}

export default configureStore({
    reducer: combineReducers({
        tasks: tasksReducer,
        rewards: rewardsReducer,
        pomodoro: pomodoroReducer
    })
})