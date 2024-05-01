import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./TasksSlice";
import rewardsReducer from "./RewardsSlice";
import pomodoroReducer from "./PomodoroSlice";
import userReducer from "./UserSlice"
import { watchTimerModeChanges } from "./storeSubscriptions";

export interface RootState {
    tasks: ReturnType<typeof tasksReducer>;
    rewards: ReturnType<typeof rewardsReducer>;
    pomodoro: ReturnType<typeof pomodoroReducer>;
    user: ReturnType<typeof userReducer>;
}

const store = configureStore({
    reducer: combineReducers({
        tasks: tasksReducer,
        rewards: rewardsReducer,
        pomodoro: pomodoroReducer,
        user: userReducer
    })
})

store.dispatch(watchTimerModeChanges(store));

export default store;