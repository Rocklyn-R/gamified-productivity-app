import { useSelector, useDispatch } from "react-redux";
import {
    selectBreakMinutes,
    selectIsPaused,
    selectLongBreakMinutes,
    selectMode,
    selectNumOfSessionsToLongBreak,
    selectSecondsLeft,
    selectSessionsRemaining,
    selectWorkMinutes,
    setSecondsLeft,
    skip
} from "../../store/PomodoroSlice";
import { pomodoroUpdateSecondsLeft, skipTimerUpdate } from "../../api/pomodoro";
import App from "../../App";
import { useCoinsFetch } from "../../hooks/CoinsFetch";
import { useRewardsFetch } from "../../hooks/RewardsFetch";
import { useTaskHistoryFetch } from "../../hooks/TaskHistoryFetch";
import { useRewardHistoryFetch } from "../../hooks/RewardHistoryFetch";
import { selectIsAuthenticated } from "../../store/UserSlice";
import { useProfileFetch } from "../../hooks/ProfileFetch";
import { useEffect } from "react";
import { usePomodoroFetch } from "../../hooks/PomodoroFetch";


export const DataFetch = () => {
    useCoinsFetch();
    useTaskHistoryFetch();
    useRewardsFetch();
    useRewardHistoryFetch();
    useProfileFetch();
    usePomodoroFetch();

    return (
        <App />
    )
}