import { useSelector, useDispatch } from "react-redux";
import { selectBreakMinutes, 
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
import { useTasksFetch } from "../../hooks/TasksFetch";
import { useCoinsFetch } from "../../hooks/CoinsFetch";
import { useRewardsFetch } from "../../hooks/RewardsFetch";
import { useTaskHistoryFetch } from "../../hooks/TaskHistoryFetch";
import { useRewardHistoryFetch } from "../../hooks/RewardHistoryFetch";
import { selectIsAuthenticated } from "../../store/UserSlice";
import { useInventoryFetch } from "../../hooks/InventoryFetch";
import { usePomodoroFetch } from "../../hooks/PomodoroFetch";
import { useProfileFetch } from "../../hooks/ProfileFetch";

export const DataFetch = () => {
    useTasksFetch();
    useCoinsFetch();
    useTaskHistoryFetch();
    usePomodoroFetch();
    useRewardsFetch();
    useRewardHistoryFetch();
    useInventoryFetch();
    useProfileFetch();


    const dispatch = useDispatch();
    const isPaused = useSelector(selectIsPaused)
    const secondsLeft = useSelector(selectSecondsLeft);
    const sessionsRemaining = useSelector(selectSessionsRemaining);
    const mode = useSelector(selectMode);
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const sessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const handleBeforeUnload = async () => {
        localStorage.removeItem('pomodoroTimerState');
        if (!isPaused) {
          const currentTime = Math.floor(Date.now() / 1000);
          const timerState = {
            secondsLeft: secondsLeft,
            timeOfUnload: currentTime
          };
          localStorage.setItem('pomodoroTimerState', JSON.stringify(timerState))
        }
      }
      if (isAuthenticated) {
       window.addEventListener('beforeunload', handleBeforeUnload); 
      }
      


    const handleLoad = async () => {
        const savedTimerState = localStorage.getItem('pomodoroTimerState');
        if (savedTimerState) {
          const { secondsLeft, timeOfUnload } = JSON.parse(savedTimerState);
          const currentTime = Math.floor(Date.now() / 1000);
          const newSecondsLeft = secondsLeft - (currentTime - timeOfUnload)
          console.log('WORKING', newSecondsLeft);
          if (newSecondsLeft > 0) {
            dispatch(setSecondsLeft(newSecondsLeft));
            await pomodoroUpdateSecondsLeft(newSecondsLeft);
          } else {
            dispatch(skip());
            await pomodoroUpdateSecondsLeft(newSecondsLeft);
            await skipTimerUpdate(
              sessionsRemaining,
              mode,
              workMinutes,
              breakMinutes,
              longBreakMinutes,
              sessionsToLongBreak
          )
          }
        }
      }
      if (isAuthenticated) {
         window.addEventListener('load', handleLoad);
      }
   



    return (
        <App />
    )
}