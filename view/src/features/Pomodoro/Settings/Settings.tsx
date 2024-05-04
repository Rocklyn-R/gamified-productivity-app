import "./Settings.css";
import Card from "../../../components/Card/Card";
import ReactSlider from "react-slider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    selectWorkMinutes,
    selectBreakMinutes,
    selectPomodoroPrice,
    selectLongBreakMinutes,
    selectNumOfSessionsToLongBreak,
    setLongBreakMinutes,
    setNumOfSessionsToLongBreak,
    selectMode,
    selectSessionsRemaining,
    selectSecondsLeft,
    setSecondsLeft
} from "../../../store/PomodoroSlice";
import { useDispatch } from "react-redux";
import { setWorkMinutes, setBreakMinutes, setSellingPrice } from "../../../store/PomodoroSlice";
import { FaCoins } from "react-icons/fa";
import { updatePomodoroSettings, pomodoroUpdateSecondsLeft } from "../../../api/pomodoro";


interface SettingsProps {
    handleCloseSettings: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ handleCloseSettings }) => {
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const numOfSessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);
    const timer_mode = useSelector(selectMode);
    const [workMinutesLocal, setWorkMinutesLocal] = useState(workMinutes);
    const [breakMinutesLocal, setBreakMinutesLocal] = useState(breakMinutes);
    const [longBreakMinutesLocal, setLongBreakMinutesLocal] = useState(longBreakMinutes);
    const [numOfSessionsToLongBreakLocal, setNumOfSessionsToLongBreakLocal] = useState(numOfSessionsToLongBreak);
    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [priceOfTomato, setPriceOfTomato] = useState(pomodoroPrice);
    const sessionsRemaining = useSelector(selectSessionsRemaining);
    const secondsLeft = useSelector(selectSecondsLeft);

    const dispatch = useDispatch();

    const handleChangeSettings = async () => {
            if (workMinutes !== workMinutesLocal) {
                dispatch(setWorkMinutes(workMinutesLocal));
                const workMinsInSecs = workMinutesLocal * 60;
                if (timer_mode === 'work' && workMinsInSecs > secondsLeft) {
                    const differenceInSeconds = (workMinutesLocal - workMinutes) * 60;
                    const newSecondsLeft = secondsLeft + differenceInSeconds;
                    dispatch(setSecondsLeft(newSecondsLeft))
                    await pomodoroUpdateSecondsLeft(newSecondsLeft);
                } 
                if (timer_mode === 'work' && workMinsInSecs <= secondsLeft) {
                    const secondsLeft = workMinutesLocal * 60;
                    dispatch(setSecondsLeft(secondsLeft))
                    await pomodoroUpdateSecondsLeft(secondsLeft);
                }
            }
            if (breakMinutes !== breakMinutesLocal) {
                dispatch(setBreakMinutes(breakMinutesLocal));
                const breakMinsInSecs = breakMinutesLocal * 60;
                if (timer_mode === 'break' && breakMinsInSecs > secondsLeft) {
                    const differenceInSeconds = (breakMinutesLocal - breakMinutes) * 60;
                    const newSecondsLeft = secondsLeft + differenceInSeconds;
                    dispatch(setSecondsLeft(newSecondsLeft));
                    await pomodoroUpdateSecondsLeft(newSecondsLeft);
                } 
                if (timer_mode === 'break' && breakMinsInSecs <= secondsLeft) {
                    const secondsLeft = breakMinutesLocal * 60;
                    dispatch(setSecondsLeft(secondsLeft));
                    await pomodoroUpdateSecondsLeft(secondsLeft);
                }
            }
            if (longBreakMinutes !== longBreakMinutesLocal) {
                dispatch(setLongBreakMinutes(longBreakMinutesLocal));
                const longBreakMinsInSecs = longBreakMinutesLocal * 60;
                if (timer_mode === 'longBreak' && longBreakMinsInSecs > secondsLeft) {
                    const differenceInSeconds = (longBreakMinutesLocal - longBreakMinutes) * 60;
                    const newSecondsLeft = secondsLeft + differenceInSeconds;
                    dispatch(setSecondsLeft(newSecondsLeft));
                    await pomodoroUpdateSecondsLeft(newSecondsLeft);
                }
                if (timer_mode === 'longBreak' && longBreakMinsInSecs <= secondsLeft) {
                    const secondsLeft = longBreakMinutesLocal * 60;
                    dispatch(setSecondsLeft(secondsLeft));
                    await pomodoroUpdateSecondsLeft(secondsLeft);
                }
            }
            if (numOfSessionsToLongBreak !== numOfSessionsToLongBreakLocal) {
                dispatch(setNumOfSessionsToLongBreak(numOfSessionsToLongBreakLocal));
            }
            dispatch(setSellingPrice(priceOfTomato));

            await updatePomodoroSettings(
                timer_mode,
                workMinutesLocal,
                breakMinutesLocal,
                longBreakMinutesLocal,
                numOfSessionsToLongBreakLocal,
                sessionsRemaining,
                priceOfTomato
            );

        handleCloseSettings();
    }

    const handleCancel = () => {
        handleCloseSettings();
    }
 
    useEffect(() => {
        const changeSettings = async () => {
            await updatePomodoroSettings(
                timer_mode,
                workMinutes,
                breakMinutes,
                longBreakMinutes,
                numOfSessionsToLongBreak,
                sessionsRemaining,
                pomodoroPrice
            );
            await pomodoroUpdateSecondsLeft(secondsLeft);
        }
        changeSettings();
    }, [timer_mode,
        workMinutes,
        breakMinutes,
        longBreakMinutes,
        numOfSessionsToLongBreak,
        sessionsRemaining,
        pomodoroPrice,
        secondsLeft])


    return (
        <Card className="pomodoro-settings-container overlay-card">
            <h4>Pomodoro settings</h4>
            <label id="first-pomodoro-settings-label">Work session duration: {workMinutesLocal} minutes</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={workMinutesLocal}
                onChange={newValue => setWorkMinutesLocal(newValue)}
                min={1}
                max={120}
            />
            <label>Short break duration: {breakMinutesLocal} minutes</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={breakMinutesLocal}
                onChange={newValue => setBreakMinutesLocal(newValue)}
                min={1}
                max={120}
            />
            <label>Long break duration: {longBreakMinutesLocal} minutes</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={longBreakMinutesLocal}
                onChange={newValue => setLongBreakMinutesLocal(newValue)}
                min={1}
                max={120}
            />
            <label>Work sessions until long break: {numOfSessionsToLongBreakLocal} sessions</label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={numOfSessionsToLongBreakLocal}
                onChange={newValue => setNumOfSessionsToLongBreakLocal(newValue)}
                min={1}
                max={10}
            />
            <label><p id="tomato-selling-price">Selling price of 1 tomato: <FaCoins className="coins-icon" />{priceOfTomato}</p></label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={priceOfTomato}
                onChange={newValue => setPriceOfTomato(newValue)}
                min={1}
                max={100}
            />
            <div className="command-buttons-container">
                <button className="command-button" onClick={handleCancel}>Cancel</button>
                <button className="command-button pomodoro-settings-done" onClick={handleChangeSettings}>Done</button>
            </div>

        </Card>
    )
}