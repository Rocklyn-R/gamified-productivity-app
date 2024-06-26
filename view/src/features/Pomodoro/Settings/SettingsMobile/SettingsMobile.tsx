import React, { useState, useRef, useEffect } from "react";
import "./SettingsMobile.css";
import { useDispatch, useSelector } from "react-redux";
import {
    selectWorkMinutes,
    selectBreakMinutes,
    selectLongBreakMinutes,
    selectNumOfSessionsToLongBreak,
    selectPomodoroPrice,
    setWorkMinutes,
    setBreakMinutes,
    setLongBreakMinutes,
    setNumOfSessionsToLongBreak,
    setSellingPrice,
    selectSecondsLeft,
    selectMode,
    selectSessionsRemaining,
    setSecondsLeft
} from "../../../../store/PomodoroSlice";
import Card from "../../../../components/Card/Card";
import { NumberPicker } from "./NumberPicker/NumberPicker";
import { FaCoins } from "react-icons/fa";
import { pomodoroUpdateSecondsLeft, updatePomodoroSettings } from "../../../../api/pomodoro";

type ModeType = "work" | "break" | "longBreak" | "numOfSessions" | "tomatoPrice" | ""
interface ShowPickerState {
    show: boolean,
    mode: ModeType;
}

interface SettingsMobileProps {
    handleCloseSettings: () => void;
}

export const SettingsMobile: React.FC<SettingsMobileProps> = ({ handleCloseSettings }) => {
    const workMinutes = useSelector(selectWorkMinutes);
    const [workMinutesLocal, setWorkMinutesLocal] = useState(workMinutes)

    const breakMinutes = useSelector(selectBreakMinutes);
    const [breakMinutesLocal, setBreakMinutesLocal] = useState(breakMinutes);


    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const [longBreakMinutesLocal, setLongBreakMinutesLocal] = useState(longBreakMinutes);


    const numOfSessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);
    const [numOfSessionsToLongBreakLocal, setNumOfSessionsToLongBreakLocal] = useState(numOfSessionsToLongBreak);

    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [tomatoPriceLocal, setTomatoPriceLocal] = useState(pomodoroPrice)

    const [showPicker, setShowPicker] = useState<ShowPickerState>({ show: false, mode: "" });
    const secondsLeft = useSelector(selectSecondsLeft);
    const timer_mode = useSelector(selectMode);
    const sessionsRemaining = useSelector(selectSessionsRemaining);

    const overlayRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowPicker({ show: false, mode: "" })
        }
    };



    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);



    const updateSelectedValue = (value: number) => {

        switch (showPicker.mode) {
            case "work":
                setWorkMinutesLocal(value);
                break;
            case "break":
                setBreakMinutesLocal(value);
                break;
            case "longBreak":
                setLongBreakMinutesLocal(value);
                break;
            case "numOfSessions":
                setNumOfSessionsToLongBreakLocal(value);
                break;
            default:
                setTomatoPriceLocal(value);
                break;
        }
    }

    const hidePicker = () => {
        setShowPicker({ ...showPicker, show: false })
    }

    const selectValue = showPicker.mode === "work" ? workMinutesLocal
        : showPicker.mode === "break" ? breakMinutesLocal
            : showPicker.mode === "longBreak" ? longBreakMinutesLocal
                : showPicker.mode === "numOfSessions" ? numOfSessionsToLongBreakLocal
                    : tomatoPriceLocal;


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
        dispatch(setSellingPrice(tomatoPriceLocal));

        await updatePomodoroSettings(
            timer_mode,
            workMinutesLocal,
            breakMinutesLocal,
            longBreakMinutesLocal,
            numOfSessionsToLongBreakLocal,
            sessionsRemaining,
            tomatoPriceLocal
        );

        handleCloseSettings();
    }

    const handleShowPicker = (modeType: ModeType) => {
        setTimeout(() => {
            setShowPicker({ show: true, mode: modeType });
        }, 100);
    }

    return (
        <>
            <Card className="pomodoro-mobile-settings overlay-card">
                <button
                    type="button"
                    className='close'
                    onClick={handleCloseSettings}
                >
                    X
                </button>
                <h4>Pomodoro Settings</h4>
                <div className="pomodoro-settings-buttons">
                    <button className="no-select" onClick={() => handleShowPicker("work")}>
                        <p>Work session duration:</p>
                        <p>{workMinutesLocal}</p>
                    </button>
                    <button className="no-select" onClick={() => handleShowPicker("break")}>
                        <p>Short break duration:</p>
                        <p>{breakMinutesLocal}</p>
                    </button>
                    <button className="no-select" onClick={() => handleShowPicker("longBreak")}>
                        <p>Long break duration:</p>
                        <p>{longBreakMinutesLocal}</p>
                    </button>
                    <button className="no-select" onClick={() => handleShowPicker("numOfSessions")}>
                        <p>Num of sessions to long break:</p>
                        <p>{numOfSessionsToLongBreakLocal}</p>
                    </button>
                    <button className="no-select" onClick={() => handleShowPicker("tomatoPrice")}>
                        <p>Selling price of tomato:</p>
                        <p id="selling-price-coins-p"><FaCoins className="coin-icon" />{tomatoPriceLocal}</p>
                    </button>
                </div>


                <div className="command-buttons-container pomodoro-settings-command-buttons">
                    <button className="command-button" onClick={handleCloseSettings}>Cancel</button>
                    <button className="command-button pomodoro-settings-done" onClick={handleChangeSettings}>Done</button>
                </div>
            </Card>

            {(showPicker.show) && (
                <div className="pomodoro-overlay" ref={overlayRef}>
                    <NumberPicker
                        mode={showPicker.mode}
                        updateValue={updateSelectedValue}
                        hidePicker={hidePicker}
                        selectValue={selectValue}
                    />
                </div>

            )}
        </>


    )

}