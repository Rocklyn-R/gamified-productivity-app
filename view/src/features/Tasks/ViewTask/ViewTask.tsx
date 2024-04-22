import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card/Card";
import { Task } from "../../../types/types"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaCoins } from "react-icons/fa";
import "./ViewTask.css"
import { TaskForm } from "../TaskForm/TaskForm";
import { DeleteMessage } from "../../../components/DeleteMessage/DeleteMessage";
import { selectTasks } from "../../../store/TasksSlice";
import { undoCompleteTask, completeOverdueHistoryTask, markHistoryTaskAsOverdue } from "../../../store/TasksSlice";
import { subtractCoins } from "../../../store/RewardsSlice";
import { formatDeadline } from "../../../utilities/utilities";
import { addToCoins } from "../../../store/RewardsSlice";
import { parseISO, isAfter } from "date-fns";


interface ViewTaskProps {
    selectedTask: Task,
    handleHideTask: () => void;
    history: boolean
}

export const ViewTask: React.FC<ViewTaskProps> = ({ selectedTask, handleHideTask, history }) => {
    const [editTask, setEditTask] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [selectedTaskDeleted, setSelectedTaskDeleted] = useState(false);
    const dispatch = useDispatch();

    const allTasks = useSelector(selectTasks);

    const handleEditTask = () => {
        setEditTask(true);
    }


    const handleDeleteTask = () => {
        setShowDeleteMessage(true);
        setEditTask(true);
    }

    const hideDeleteMessage = () => {
        setShowDeleteMessage(false);
        setEditTask(false);
    }

    const handleUndoComplete = (task: Task) => {
        const now = new Date();
        const deadline = parseISO(task.deadline);

        if (isAfter(deadline, now)) {
            dispatch(undoCompleteTask(task));
            dispatch(subtractCoins(task.coinReward));
        } else {
            dispatch(markHistoryTaskAsOverdue(task));
            dispatch(subtractCoins(task.coinReward));
            dispatch(subtractCoins(task.coinPenalty));
        }


        handleHideTask();
    }

    const handleCompleteOverdueHistoryTask = (task: Task) => {
        dispatch(completeOverdueHistoryTask(task));
        dispatch(addToCoins(task.coinPenalty));
        dispatch(addToCoins(task.coinReward));
        handleHideTask();
    }



    useEffect(() => {
        if (history) {
            return;
        }
        if (!allTasks.includes(selectedTask)) {
            setSelectedTaskDeleted(true);
        }
    }, [allTasks, selectedTask, history]);





    const handleCloseForm = () => {
        setEditTask(false);
    }

    return (
        <>
            {!editTask && !selectedTaskDeleted &&
            
                <Card className="view-task-container overlay-card">
                    <button
                        className="close"
                        onClick={handleHideTask}
                    >
                        X
                    </button>
                    <div className="edit-delete-buttons">
                        {!history &&
                            <button
                                className="edit-task"
                                onClick={handleEditTask}
                            >
                                <FaRegEdit className="edit-task-icon" /></button>
                        }

                        <button
                            className="delete-task"
                            onClick={handleDeleteTask}
                        >
                            <MdDeleteOutline className='delete-task-icon' />
                        </button>
                    </div>

                    <p>
                        Name: {selectedTask.name}
                    </p>

                    {selectedTask.notes && (
                        <p>Notes: {selectedTask.notes}</p>
                    )}
                    {selectedTask.deadline && (
                        <p>Deadline: {formatDeadline(selectedTask.deadline)}</p>
                    )}
                    <p className={(history && selectedTask.overdue) ? "hide-coin-reward" : (history && !selectedTask.overdue) ? "coin-reward-text" : "view-coin-text"}>
                        Coin Reward: <FaCoins className="coins-icon" />{selectedTask.coinReward}
                    </p>

                    <p className={(history && selectedTask.overdue) ? "penalty-text" : (history && !selectedTask.overdue) ? "hide-penalty-text" : "view-penalty-text"}>Penalty: <FaCoins className="coins-icon" /> {selectedTask.coinPenalty} </p>

                    {(history && !selectedTask.overdue) &&
                        <button className="command-button" onClick={() => handleUndoComplete(selectedTask)}>
                            Undo completion
                        </button>}
                    {(history && selectedTask.overdue) &&
                        <button className="command-button" onClick={() => handleCompleteOverdueHistoryTask(selectedTask)}>
                            Change to Completed
                        </button>}
                </Card>
            }

            {showDeleteMessage && editTask &&
                <DeleteMessage
                    hideDeleteMessage={hideDeleteMessage}
                    selectedTask={selectedTask}
                    history={history}
                    handleHideTask={handleHideTask}
                />

            }

            {editTask && !showDeleteMessage &&
                <TaskForm
                    selectedTask={selectedTask}
                    isEditMode={true}
                    handleHideTask={handleHideTask}
                    handleCloseForm={handleCloseForm}
                />}

        </>

    )
}