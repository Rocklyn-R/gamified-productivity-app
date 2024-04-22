import "./Timer.css";
import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { FaStop } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
    selectIsPaused,
    play,
    pause,
    tick,
    selectSecondsLeft,
    selectWorkMinutes,
    selectBreakMinutes,
    selectMode,
    reset,
    skip,
    selectLongBreakMinutes,
    selectPomodoros,
    applyQueuedSettings,
    applyQueuedSettingsAtReset
} from "../../../store/PomodoroSlice";
import { BsFillSkipEndFill } from "react-icons/bs";
import tomato from "../../../images/tomato.png";
import { FaCoins } from "react-icons/fa";
import { selectTotalCoins } from "../../../store/RewardsSlice";


let intervalId: any = null;

interface TimerProps {
    handleShowSellPomodoros: () => void;
}

export const Timer: React.FC<TimerProps> = ({ handleShowSellPomodoros }) => {
    const dispatch = useDispatch();
    const isPaused = useSelector(selectIsPaused);
    const mode = useSelector(selectMode);
    const secondsLeft = useSelector(selectSecondsLeft);
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const pomodoros = useSelector(selectPomodoros);
    const totalCoins = useSelector(selectTotalCoins);



    useEffect(() => {

        if (isPaused) {
            clearInterval(intervalId);
        }

    }, [isPaused]);




    const pauseTimer = () => {
        dispatch(pause());
    };

    const startTimer = () => {
        let iterations = 0;
        const maxIterations = secondsLeft;
        const id = setInterval(() => {
            if (iterations <= maxIterations) {
                dispatch(tick());
                iterations++;
            } else {
                intervalId = id;
            }
        }, 1000);
        intervalId = id;
    };




    const playTimer = () => {
        dispatch(applyQueuedSettings());
        dispatch(play());
        startTimer();
    }

    const resetTimer = () => {
        dispatch(applyQueuedSettingsAtReset());
        dispatch(reset());
    }

    const skipTimer = () => {
        dispatch(applyQueuedSettings());
        dispatch(skip());
    }



    const totalSeconds = mode === "work" ? workMinutes * 60 : mode === "break" ? breakMinutes * 60 : longBreakMinutes * 60;
    const percentage = (secondsLeft / totalSeconds) * 100;

    const timeString = (): string => {
        let formattedSeconds = secondsLeft % 60;
        if (formattedSeconds < 10) {
            return `${Math.floor(secondsLeft / 60)}:0${formattedSeconds}`;
        } else {
            return `${Math.floor(secondsLeft / 60)}:${formattedSeconds}`;
        }
    }


    const modeString = mode === "work" ? "Work Session" : mode === "break" ? "Break" : "Long Break";

    return (
        <div className="circular-progressbar-wrapper">
            <CircularProgressbar
                value={percentage}
                text={timeString()}
                styles={buildStyles({
                    textColor: "rgb(240,248,255)",
                    pathColor: "#8cc3f5",
                    trailColor: "rgb(240,248,255)"
                })} />
            <p id="mode-string">{modeString}</p>
            <div className="coin-pomodoro-box">
               
                    <p id="pomodoro-coin-p"><FaCoins className='pomodoro-coin-icon' /> {totalCoins}</p>
            
            <button className="pomodoro-button no-select" onClick={handleShowSellPomodoros}>
                <img alt="" src={tomato} className="pomodoro-icon" height="30" width="30" />
                <p>{pomodoros}</p>
            </button>
            </div>
            
            <div className="control-timer-buttons">
                <button
                    className="play-button no-select"
                    onClick={resetTimer}
                ><FaStop className="control-icon" /></button>
                {isPaused &&
                    <button
                        className="play-button no-select"
                        onClick={playTimer}
                    >
                        <FaPlay className="control-icon" /></button>}
                {!isPaused && <button className="play-button no-select" onClick={pauseTimer}><FaPause className="control-icon" /></button>}
                <button
                    className="play-button no-select"
                    onClick={skipTimer}
                ><BsFillSkipEndFill className="play-button" /></button>
            </div>

        </div>
    )
}