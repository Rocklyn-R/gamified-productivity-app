import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPomodoro } from "../api/pomodoro";
import { setPomodoro } from "../store/PomodoroSlice";
import { selectIsAuthenticated } from "../store/UserSlice";

export const usePomodoroFetch = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const pomodoroFetch = async () => {
            try {
                const pomodoroData = await getPomodoro();
                console.log(pomodoroData);
                dispatch(setPomodoro(pomodoroData));
            } catch (error) {
                console.log(error)
            }
        }
        if (isAuthenticated) {
            pomodoroFetch(); 
        }
       
    }, [dispatch, isAuthenticated]);
}