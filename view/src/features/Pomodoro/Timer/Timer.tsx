import "./Timer.css";
import React, { useCallback, useEffect } from "react";
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
    selectSessionsRemaining,
    selectNumOfSessionsToLongBreak
} from "../../../store/PomodoroSlice";
import { BsFillSkipEndFill } from "react-icons/bs";
import tomato from "../../../images/tomato.png";
import { FaCoins } from "react-icons/fa";
import { selectTotalCoins } from "../../../store/RewardsSlice";
import { skipTimerUpdate } from "../../../api/pomodoro";
import { pomodoroUpdateSecondsLeft } from "../../../api/pomodoro";
import { pausePlayPomodoroTimer } from "../../../api/pomodoro";


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
    const sessionsRemaining = useSelector(selectSessionsRemaining);
    const sessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak)

    const startTimer = useCallback(() => {
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
        // eslint-disable-next-line
    }, []);


    useEffect(() => {

        if (isPaused) {
            clearInterval(intervalId);
        }
    }, [isPaused]);

 
    useEffect(() => {
        if (!isPaused) {
            clearInterval(intervalId);
            startTimer();
            console.log("this")
        }  
    }, [isPaused, startTimer])



    const pauseTimer = async () => {
        await pomodoroUpdateSecondsLeft(secondsLeft);
        await pausePlayPomodoroTimer(true);
        dispatch(pause());
    };



    const playTimer = async () => {
        dispatch(play());
        startTimer();
        await pausePlayPomodoroTimer(false);
    }

    const resetTimer = async () => {
        dispatch(reset());
        await pausePlayPomodoroTimer(true);
        let newSecondsLeft = secondsLeft;
        if (mode === "work") {
            newSecondsLeft = workMinutes * 60;
        } else if (mode === "break") {
            newSecondsLeft = breakMinutes * 60;
        } else if (mode === "longBreak") {
            newSecondsLeft = longBreakMinutes * 60;
        }
        await pomodoroUpdateSecondsLeft(newSecondsLeft);
    }
 
    const skipTimer = async () => {
        dispatch(skip());
      await skipTimerUpdate(
            sessionsRemaining,
            mode,
            workMinutes,
            breakMinutes,
            longBreakMinutes,
            sessionsToLongBreak
        )
        await pausePlayPomodoroTimer(true);
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