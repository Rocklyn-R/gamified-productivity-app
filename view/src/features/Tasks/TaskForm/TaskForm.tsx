import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Card from '../../../components/Card/Card';
import './TaskForm.css';
import { setTasks, editTask } from '../../../store/TasksSlice';
import { Task } from '../../../types/types';
import { v4 as uuidv4 } from "uuid";
import 'react-calendar/dist/Calendar.css';
import { convertDateToString } from '../../../utilities/utilities';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SelectChangeEvent, TextField } from '@mui/material';
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import dayjs from 'dayjs';



interface TaskFormProps {
    handleCloseForm: () => void;
    isEditMode?: boolean,
    selectedTask?: Task,
    handleHideTask?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ handleCloseForm, isEditMode, selectedTask, handleHideTask }) => {

    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState("");
    const [notes, setNotes] = useState('');
    const [deadlineOption, setDeadlineOption] = useState("");
    const [deadline, setDeadline] = useState<string | null>(null);
    const [coinReward, setCoinReward] = useState(0);
    const [submitError, setSubmitError] = useState(false);
    const [penalty, setPenalty] = useState(0);


    useEffect(() => {


        if (isEditMode && selectedTask) {
            setTaskName(selectedTask.name);
            setNotes(selectedTask.notes);
            setCoinReward(selectedTask.coinReward);
            setPenalty(selectedTask.coinPenalty);
            if (selectedTask.deadline === "") {
                setDeadlineOption("nodeadline");
            } else if (selectedTask.deadline === convertDateToString("tomorrow")) {
                setDeadlineOption("tomorrow")
            } else if (selectedTask.deadline === convertDateToString("today")) {
                setDeadlineOption("today");
            } else {
                setDeadlineOption("custom");
                setDeadline(selectedTask.deadline);
            }

        }
    }, [isEditMode, selectedTask]);



    const handleSelectDeadlineOption = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setDeadlineOption(value);
        if (event.target.value === "today") {
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            const todayString = today.toISOString();
            setDeadline(todayString);
        } else if (event.target.value === "tomorrow") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(23, 59, 59, 999);
            const tomorrowString = tomorrow.toISOString();
            setDeadline(tomorrowString);

        } else {
            setDeadline(null);
        }
    }




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const taskDeadline = deadline ? deadline : ""
        if (!isEditMode) {
            dispatch(setTasks({
                name: taskName,
                notes: notes,
                coinReward: coinReward,
                id: uuidv4(),
                deadline: taskDeadline,
                coinPenalty: penalty,
                overdue: false
            }))
        }
        if (isEditMode && selectedTask && handleHideTask) {
            dispatch(editTask({
                name: taskName,
                notes: notes,
                coinReward: coinReward,
                id: selectedTask.id,
                deadline: taskDeadline,
                coinPenalty: penalty,
                overdue: false
            }))
            handleHideTask();
        }

        handleCloseForm();


        setSubmitError(false);
    }

    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
        // newValue is a dayjs object
        console.log(newValue); // See the dayjs object in console

        if (newValue) {
            setDeadline(newValue.toISOString()); // Example of using dayjs object to set state
        } else {
            setDeadline(null); // Handle case where date is cleared
        }
    };


    return (
        <Card className="form-container overlay-card">
            <form onSubmit={handleSubmit} autoComplete="off">
                
                <button
                    type="button"
                    className='close'
                    onClick={handleCloseForm}
                >
                    X
                </button>

                <h4>Add task</h4>
                {submitError &&
                    <p>Please name your task</p>
                }

                <TextField
                    type="text"
                    label="Task Name" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                      }}
                />


                <TextField
                    type="text"
                    label="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{
                        width: '100%',
                        marginBottom: '20px', // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                      }}
                />

                <TextField
                    label="Coin Reward"
                    type="number"
                    value={coinReward}
                    onChange={(e) => setCoinReward(parseInt(e.target.value, 10))}
                    sx={{
                        width: '100%',
                        marginBottom: '20px', // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                      }}
                />
                <FormControl fullWidth >
                    <InputLabel id="deadline-label">Deadline</InputLabel>
                    <Select
                        labelId="deadline-label"
                        label="Deadline"
                        value={deadlineOption}
                        onChange={handleSelectDeadlineOption}
                        sx={{
                            width: '100%',
                            marginBottom: '20px',
                            textAlign: 'start'
                        }}
                    >
                        <MenuItem value={"nodeadline"}>No deadline</MenuItem>
                        <MenuItem value={"today"}>Today</MenuItem>
                        <MenuItem value={"tomorrow"}>Tomorrow</MenuItem>
                        <MenuItem value={"custom"}>Custom</MenuItem>
                    </Select>
                </FormControl>

                {deadlineOption === "custom" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select Date"
                            value={deadline ? dayjs(deadline) : null}
                            minDate={dayjs()}
                            onChange={handleDateChange}
                            sx={{
                                width: '100%',
                                marginBottom: '20px',
                                textAlign: 'start'
                            }}
                        />
                    </LocalizationProvider>
                )}

                {(deadlineOption === "today" || deadlineOption === "tomorrow" || deadlineOption === "custom") && (
                    <>
                        <TextField
                            label="Coin Penalty"
                            type="number"
                            value={penalty}
                            onChange={(e) => setPenalty(parseInt(e.target.value, 10))}
                            sx={{
                                width: '100%',
                                marginBottom: '20px', // Using the sx prop to apply margin
                            }}
                            InputProps={{
                                autoComplete: 'off', // More specific to potentially improve browser compliance
                              }}
                        />
                    </>

                )}
                <button type="submit" value="Submit" className="command-button no-select">{selectedTask ? "Done editing" : "Create task"}</button>


            </form>
        </Card>

    )
}