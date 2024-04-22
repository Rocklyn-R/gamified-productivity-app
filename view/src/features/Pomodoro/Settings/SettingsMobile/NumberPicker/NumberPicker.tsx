import React, { useState } from "react";
import Card from "../../../../../components/Card/Card";
import Picker from "react-mobile-picker";
import "./NumberPicker.css";

interface BreakMinutesProps {
    mode: "work" | "break" | "longBreak" | "numOfSessions" | "tomatoPrice" | "";
    updateValue: (value: number) => void;
    hidePicker: () => void;
    selectValue: number;
}

interface PickerValue {
    [key: string]: string;
}

export const NumberPicker: React.FC<BreakMinutesProps> = ({ mode, updateValue, hidePicker, selectValue }) => {


    const [valueToUpdate, setValueToUpdate] = useState({numbers: String(selectValue)});


    const numberSelection = () => {
        if (mode === "numOfSessions") {
            return Array.from({ length: 10 }, (_, i) => i + 1);
        } else if (mode === "work" || "break" || "longBreak") {
            return Array.from({ length: 120 }, (_, i) => i + 1);
        } else if (mode === "tomatoPrice") {
            return Array.from({ length: 100 }, (_, i) => i + 1);
        } else return [];
    }



    const selectOnChange = (value: PickerValue) => {
        const newValue = value.numbers;
        setValueToUpdate({numbers: newValue})

    }

    const selectHeading = mode === "work" ? "Work session duration"
    : mode === "break" ? "Short break duration"
        : mode === "longBreak" ? "Long break duration"
            : mode === "numOfSessions" ? "Work sessions until long break"
                : "Selling price of tomato";

    const handleSubmit = () => {
        updateValue(parseInt(valueToUpdate.numbers, 10));
        hidePicker();
    }

    return (
        <Card className="picker-card">
            <h4>{selectHeading}</h4>
            <div className="spacer"></div>
            <div className="centered-content">
            <Picker 
            value={valueToUpdate} 
            onChange={selectOnChange} 
            className="picker"
            height={80}
            >
                <Picker.Column name="numbers">
                    {numberSelection().map(number => (
                        <Picker.Item key={number} value={String(number)}>
                            {number}
                        </Picker.Item>
                    ))}
                </Picker.Column>
            </Picker>

            <div className="command-buttons-container pomodoro-settings-picker-buttons">
                    <button className="command-button" onClick={() => hidePicker()}>Cancel</button>
                    <button className="command-button pomodoro-settings-done" onClick={handleSubmit}>Ok</button>
                </div>
                </div>
        </Card>
    )
}