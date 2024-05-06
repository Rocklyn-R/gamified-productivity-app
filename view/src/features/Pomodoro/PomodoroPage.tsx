import "./PomodoroPage.css";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/Card/Card";
import { Timer } from "./Timer/Timer";
import { IoIosSettings } from "react-icons/io";
import { Settings } from "./Settings/Settings";
import { useSelector, useDispatch } from "react-redux";
import { selectIsPaused, 
    selectSessionsRemaining, 
    setPomodoro, 
    selectIsLoadingPomodoro, 
    setIsLoadingPomodoro,
    pause,
    addPomodoro,
    setPomodoroFromLocalStorage,
} from "../../store/PomodoroSlice";
import { PomodoroForm } from "./PomodoroForm/PomodoroForm";
import { FaCoins } from "react-icons/fa";
import { selectTotalCoins } from "../../store/RewardsSlice";
import { SettingsMobile } from "./Settings/SettingsMobile/SettingsMobile";
import { getPomodoro, pomodoroUpdateSecondsLeft, updatePomodoroCurrentTime } from "../../api/pomodoro";
import { selectIsAuthenticated } from "../../store/UserSlice";


export const PomodoroPage = () => {
    const [showSettings, setShowSettings] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const isPaused = useSelector(selectIsPaused);
    const [showSellPomodoros, setShowSellPomodoros] = useState(false);
    const sessionsRemaining = useSelector(selectSessionsRemaining);
    const totalCoins = useSelector(selectTotalCoins);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectIsLoadingPomodoro)
    const handleOpenSettings = () => {
        setShowSettings(true);
    }
    const [timerInLocalStorage, setTimerInLocalStorage] = useState(true);

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowSettings(false);
            setShowSellPomodoros(false);
        }
    };

    useEffect(() => {
        const updateTimer = async () => {
            const savedTimerState = localStorage.getItem('pomodoroTimerState');
            console.log(savedTimerState)
            if (savedTimerState) {
                const { 
                    secondsLeftSaved, 
                    timeOfUnload,
                    sessionsRemaining,
                    pomodoros,
                    mode,
                    workMinutes,
                    breakMinutes,
                    longBreakMinutes,
                } = JSON.parse(savedTimerState);
                const currentTime = Math.floor(Date.now() / 1000);
                const newSecondsLeft = secondsLeftSaved - (currentTime - timeOfUnload)
                console.log('WORKING', newSecondsLeft);
                const newMode = mode === "work" && sessionsRemaining > 1 ? "break" : mode === "work" && sessionsRemaining === 1 ? "longBreak" : mode === "break" ? "work" : mode === "longBreak" ? "work" : mode;
                const newSessionsRemaining = mode === "work" ? sessionsRemaining - 1 : mode === "break" ? sessionsRemaining : mode === "longBreak" ? 0 : sessionsRemaining;
                const resetSeconds = newMode === "work" ? workMinutes * 60 : newMode === "break" ? breakMinutes * 60 : newMode === 'longBreak' ? longBreakMinutes * 60 : 4;
                const newPomodoros = newMode === "break" || newMode === "longBreak" ? pomodoros + 1 : pomodoros;
                if (newSecondsLeft > 0) {
                    //dispatch(setSecondsLeft(newSecondsLeft));
                    await pomodoroUpdateSecondsLeft(newSecondsLeft);
                    dispatch(setPomodoroFromLocalStorage({
                        seconds_left: newSecondsLeft, 
                        work_mins: workMinutes,
                        break_mins: breakMinutes,
                        long_break_mins: longBreakMinutes,
                        sessions_remaining: sessionsRemaining,
                        timer_mode: mode,
                        pomodoros: pomodoros
                    }))
                } else if (newSecondsLeft <= 0) {
                    await pomodoroUpdateSecondsLeft(resetSeconds);
                    console.log("IT'S LESS THAN")
                    dispatch(setPomodoroFromLocalStorage({
                        seconds_left: resetSeconds, 
                        work_mins: workMinutes,
                        break_mins: breakMinutes,
                        long_break_mins: longBreakMinutes,
                        sessions_remaining: newSessionsRemaining,
                        timer_mode: newMode,
                        pomodoros: newPomodoros
                    }))
                    dispatch(pause());
                    await updatePomodoroCurrentTime(
                        resetSeconds,
                        true,
                        newMode,
                        newSessionsRemaining,
                        newPomodoros
                    )
                    dispatch(addPomodoro(newPomodoros));
                   
                }
                localStorage.removeItem('pomodoroTimerState');
                setTimerInLocalStorage(false);
            } else {
                setTimerInLocalStorage(false)
            };
        }
        updateTimer();
    }, [dispatch])

    useEffect(() => {
        const pomodoroFetch = async () => {
            const pomodoroData = await getPomodoro();
            if (pomodoroData) {
                console.log(pomodoroData);
                dispatch(setPomodoro(pomodoroData));
                dispatch(setIsLoadingPomodoro(false));
            }
        }
        if (isAuthenticated && isLoading && !timerInLocalStorage) {
            pomodoroFetch();
        }
    }, [dispatch, isAuthenticated, isLoading, timerInLocalStorage]);


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    useEffect(() => {

    })

    const handleCloseSettings = () => {
        setShowSettings(false);
    }


    const handleShowSellPomodoros = () => {
        setShowSellPomodoros(true);
    }

    const hideShowSellPomodoros = () => {
        setShowSellPomodoros(false);
    }



    return (

        <Card className="pomodoro-container">

            <h1 id="pomodoro-header">POMODORO TIMER</h1>
            <div className="coin-count-header pomodoro-coin-count">
                <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
            </div>

            {isPaused && (
                <button
                    className="settings-button no-select"
                    onClick={handleOpenSettings}
                >
                    <IoIosSettings className="settings-icon" /></button>
            )}


            {!isLoading && !timerInLocalStorage && <Timer handleShowSellPomodoros={handleShowSellPomodoros} />}
            {showSettings && (
                <div className="overlay" ref={overlayRef}>
                    <div className="settings-div">
                        <Settings handleCloseSettings={handleCloseSettings} />
                    </div>
                    <div className="mobile-settings-div">
                        <SettingsMobile handleCloseSettings={handleCloseSettings} />
                    </div>

                </div>
            )}

            {showSellPomodoros && (
                <div className="overlay" ref={overlayRef}>
                    <PomodoroForm hideForm={hideShowSellPomodoros} />
                </div>
            )}
            {!isLoading && <p id="sessions-remaining">{sessionsRemaining > 0 && `${sessionsRemaining} work sessions before long break`}</p>}
        </Card>
    )
}