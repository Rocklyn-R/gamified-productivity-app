import "./PomodoroPage.css";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/Card/Card";
import { Timer } from "./Timer/Timer";
import { IoIosSettings } from "react-icons/io";
import { Settings } from "./Settings/Settings";
import { useSelector, useDispatch } from "react-redux";
import { selectIsPaused, selectSessionsRemaining, setPomodoro, selectIsLoadingPomodoro, setIsLoading } from "../../store/PomodoroSlice";
import { PomodoroForm } from "./PomodoroForm/PomodoroForm";
import { FaCoins } from "react-icons/fa";
import { selectTotalCoins } from "../../store/RewardsSlice";
import { SettingsMobile } from "./Settings/SettingsMobile/SettingsMobile";
import { getPomodoro } from "../../api/pomodoro";
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

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowSettings(false);
            setShowSellPomodoros(false);
        }
    };

    useEffect(() => {
        const pomodoroFetch = async () => {
            const pomodoroData = await getPomodoro();
            if (pomodoroData) {
               dispatch(setPomodoro(pomodoroData));
               dispatch(setIsLoading(false));
            }
        if (isAuthenticated && isLoading) {
            pomodoroFetch(); 
        }
    }
    }, [dispatch, isAuthenticated]);


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

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


            {!isLoading && <Timer handleShowSellPomodoros={handleShowSellPomodoros} />}
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
            <p id="sessions-remaining">{sessionsRemaining > 0 && `${sessionsRemaining} work sessions before long break`}</p>
        </Card>
    )
}