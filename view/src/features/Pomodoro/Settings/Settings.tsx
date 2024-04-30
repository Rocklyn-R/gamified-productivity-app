import "./Settings.css";
import Card from "../../../components/Card/Card";
import ReactSlider from "react-slider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectWorkMinutes, 
    selectBreakMinutes, 
    selectPomodoroPrice, 
    selectLongBreakMinutes, 
    selectNumOfSessionsToLongBreak, 
    setLongBreakMinutes, 
    setNumOfSessionsToLongBreak,
} from "../../../store/PomodoroSlice";
import { useDispatch } from "react-redux";
import { setWorkMinutes, setBreakMinutes, setSellingPrice } from "../../../store/PomodoroSlice";
import { FaCoins } from "react-icons/fa";


interface SettingsProps {
    handleCloseSettings: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ handleCloseSettings }) => {
    const workMinutes = useSelector(selectWorkMinutes);
    const breakMinutes = useSelector(selectBreakMinutes);
    const longBreakMinutes = useSelector(selectLongBreakMinutes);
    const numOfSessionsToLongBreak = useSelector(selectNumOfSessionsToLongBreak);

    const [workMinutesLocal, setWorkMinutesLocal] = useState(workMinutes);
    const [breakMinutesLocal, setBreakMinutesLocal] = useState(breakMinutes);
    const [longBreakMinutesLocal, setLongBreakMinutesLocal] = useState(longBreakMinutes);
    const [numOfSessionsToLongBreakLocal, setNumOfSessionsToLongBreakLocal] = useState(numOfSessionsToLongBreak);
    const pomodoroPrice = useSelector(selectPomodoroPrice);
    const [priceOfTomato, setPriceOfTomato] = useState(pomodoroPrice);


    const dispatch = useDispatch();

    const handleChangeSettings = () => {
        dispatch(setWorkMinutes(workMinutesLocal));
        dispatch(setBreakMinutes(breakMinutesLocal));
        dispatch(setLongBreakMinutes(longBreakMinutesLocal));
        dispatch(setNumOfSessionsToLongBreak(numOfSessionsToLongBreakLocal));
        dispatch(setSellingPrice(priceOfTomato));
        handleCloseSettings();
    }

    const handleCancel = () => {
        handleCloseSettings();
    }


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