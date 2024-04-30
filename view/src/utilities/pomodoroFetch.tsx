import { useDispatch } from "react-redux";
import { getPomodoro } from "../api/pomodoro";
import { setPomodoro } from "../store/PomodoroSlice";

const dispatch = useDispatch();

export const pomodoroFetch = async () => {
    try {
        const pomodoroData = await getPomodoro();
        console.log(pomodoroData);
        dispatch(setPomodoro(pomodoroData));
    } catch (error) {
        console.log(error)
    }
}