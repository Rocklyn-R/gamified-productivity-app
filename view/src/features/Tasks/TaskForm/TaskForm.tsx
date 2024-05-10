import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Card from '../../../components/Card/Card';
import './TaskForm.css';
import { addTask, editTask } from '../../../store/TasksSlice';
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
import { createNewTask, updateTask } from '../../../api/tasks';


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
    const [deadlineOption, setDeadlineOption] = useState("nodeadline");
    const [deadline, setDeadline] = useState<string | null>(null);
    const [coinReward, setCoinReward] = useState(0);
    const [submitError, setSubmitError] = useState(false);
    const [penalty, setPenalty] = useState(0);


    useEffect(() => {
        if (isEditMode && selectedTask) {
            setTaskName(selectedTask.name);
            setNotes(selectedTask.notes);
            setCoinReward(selectedTask.coin_reward);
            setPenalty(selectedTask.coin_penalty);
            if (selectedTask.deadline === "") {
                setDeadlineOption("nodeadline");
            } else if (selectedTask.deadline === convertDateToString("tomorrow")) {
                console.log(convertDateToString("tomorrow"));
                setDeadlineOption("tomorrow")
            } else if (selectedTask.deadline === convertDateToString("today")) {
                setDeadlineOption("today");
            } else {
                console.log(selectedTask.deadline);
                console.log(convertDateToString("tomorrow"));
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
            const todayWithOffset = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
            const todayString = todayWithOffset.toISOString();
            setDeadline(todayString);
        } else if (event.target.value === "tomorrow") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(23, 59, 59, 999);
            const tomorrowWithOffset = new Date(tomorrow.getTime() - (tomorrow.getTimezoneOffset() * 60000));
            const tomorrowString = tomorrowWithOffset.toISOString();
            setDeadline(tomorrowString);

        } else if (event.target.value === "custom") {
            setDeadline(null);
        } else {
            setDeadline(null);
            setPenalty(0);
        }
    }




    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const taskDeadline = deadline ? deadline : ""
        if (!isEditMode) {
            const id = uuidv4();
            const createdTask = await createNewTask(
                id,
                taskName,
                notes,
                coinReward,
                taskDeadline,
                penalty,
                false
            );
            if (createdTask) {
                dispatch(addTask({
                    id: id,
                    name: taskName,
                    notes: notes,
                    coin_reward: coinReward,
                    deadline: taskDeadline,
                    coin_penalty: penalty,
                    overdue: false,
                    completion_status: 'pending'
                }))
                setSubmitError(false)
                handleCloseForm();
            } else {
                setSubmitError(true);
            }
        }
        if (isEditMode && selectedTask && handleHideTask) {
            const id = selectedTask.id
            const updatedTask = await updateTask(
                id,
                taskName,
                notes,
                coinReward,
                taskDeadline,
                penalty,
            );
            if (updatedTask) {
                dispatch(editTask({
                    name: taskName,
                    notes: notes,
                    coin_reward: coinReward,
                    id: id,
                    deadline: taskDeadline,
                    coin_penalty: penalty,
                    overdue: false,
                    completion_status: 'pending'
                }))
                handleHideTask();
                handleCloseForm();
            }

        }

    }

    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
        // newValue is a dayjs object
        console.log(newValue); // See the dayjs object in console

        if (newValue) {
            const adjustedDate = newValue.endOf('day');
            const formattedDate = adjustedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            console.log(formattedDate);
            setDeadline(formattedDate);

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

                <h4>{isEditMode ? "Edit task" : "Add task"}</h4>
                {submitError && <p>An error occured. Try again</p>}
                <TextField
                    type="text"
                    label="Task Name"
                    variant="outlined"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        '& .MuiInputLabel-root': {
                            color: '#0c3d63', // Default label color
                            '&.Mui-focused': {
                                color: '#0c3d63', // Label color when focused
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': { 
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-input': { 
                            color: '#0c3d63',
                        },
                    }}
                    inputProps={{
                        autoComplete: "off",
                        maxLength: 100
                    }}
                />


                <TextField
                    type="text"
                    label="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{
                        width: '100%',
                        marginBottom: '20px',
                        '& .MuiInputLabel-root': {
                            color: '#0c3d63', // Default label color
                            '&.Mui-focused': {
                                color: '#0c3d63', // Label color when focused
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': { 
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-input': { 
                            color: '#0c3d63',
                        },
                    }}
                    inputProps={{
                        autoComplete: "off",
                        maxLength: 200
                    }}
                />

                <TextField
                    label="Coin Reward"
                    type="number"
                    value={coinReward}
                    onChange={(e) => setCoinReward(parseInt(e.target.value, 10))}
                    sx={{
                        width: '100%',
                        marginBottom: '20px',
                        '& .MuiInputLabel-root': {
                            color: '#0c3d63', // Default label color
                            '&.Mui-focused': {
                                color: '#0c3d63', // Label color when focused
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': { 
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-input': { 
                            color: '#0c3d63',
                        },
                    }}
                    InputProps={{
                        autoComplete: 'off',
                        inputProps: { max: 100000 }, // Set maximum value
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
                            textAlign: 'start',
                            '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
                                color: '#0c3d63', // Default label color
                            },
                            '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
                                color: '#0c3d63', // Label color when focused
                            },
                            '& .MuiSelect-root': {
                                color: '#0c3d63', // Default text color
                            },
                            '& .MuiSelect-icon': {
                                color: '#0c3d63', // Dropdown icon color
                            },
                            color: "#0c3d63",
                            '.MuiOutlinedInput-notchedOutline': {
                              borderColor: '#0c3d63',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#0c3d63',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#0c3d63',
                            },
                            '.MuiSvgIcon-root ': {
                              fill: "#0c3d63",
                            },
                        }}
                    >
                        <MenuItem sx={{ color: '#0c3d63' }} value={"nodeadline"}>No deadline</MenuItem>
                        <MenuItem sx={{ color: '#0c3d63' }} value={"today"}>Today</MenuItem>
                        <MenuItem sx={{ color: '#0c3d63' }} value={"tomorrow"}>Tomorrow</MenuItem>
                        <MenuItem sx={{ color: '#0c3d63' }} value={"custom"}>Custom</MenuItem>
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
                                textAlign: 'start',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0c3d63', // Border color
                                },
                                '& .MuiSvgIcon-root': {
                                    fill: '#0c3d63', // Icon color
                                },
                                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#0c3d63', // Border color when focused
                                },
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
                                marginBottom: '20px',
                                '& .MuiInputLabel-root': {
                                    color: '#0c3d63', // Default label color
                                    '&.Mui-focused': {
                                        color: '#0c3d63', // Label color when focused
                                    },
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#0c3d63',
                                    }
                                },
                                '& .MuiOutlinedInput-root.Mui-focused': { 
                                    '& fieldset': {
                                        borderColor: '#0c3d63',
                                    }
                                },
                                '& .MuiOutlinedInput-input': { 
                                    color: '#0c3d63',
                                },
                            }}
                            InputProps={{
                                autoComplete: 'off',
                                inputProps: { max: 100000 },
                            }}
                        />
                    </>

                )}
                <button type="submit" value="Submit" className="command-button no-select">{selectedTask ? "Done editing" : "Create task"}</button>
            </form>
        </Card>

    )
}