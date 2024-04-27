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
import { undoCompleteTask, completeOverdueHistoryTask, uncompleteHistoryTask } from "../../../store/TasksSlice";
import { subtractCoins } from "../../../store/RewardsSlice";
import { formatDeadline } from "../../../utilities/utilities";
import { addToCoins } from "../../../store/RewardsSlice";
import { parseISO, isAfter } from "date-fns";
import { changeCompletionStatus } from "../../../api/tasks";


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

    const handleUndoComplete = async (task: Task) => {
        const now = new Date();
        const deadline = parseISO(task.deadline);

        if (isAfter(deadline, now)) {
            const incompletedTask = await changeCompletionStatus('pending', task.id, 'update-completion-status');
            if (incompletedTask) {
                dispatch(undoCompleteTask(task));
                dispatch(subtractCoins(task.coin_reward));
            }
        } else {
            const incompletedTask = await changeCompletionStatus('incomplete', task.id, 'update-completion-status');
            if (incompletedTask) {
                dispatch(uncompleteHistoryTask(task));
                dispatch(subtractCoins(task.coin_reward));
                dispatch(subtractCoins(task.coin_penalty));
            }
        }

        handleHideTask();
    }

    const handleCompleteHistoryTask = async (task: Task) => {
        const completedTask = await changeCompletionStatus('completed', task.id, 'update-completion-status');
        if (completedTask) {
            dispatch(completeOverdueHistoryTask(task));
            dispatch(addToCoins(task.coin_penalty));
            dispatch(addToCoins(task.coin_reward));
        }
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
                        Coin Reward: <FaCoins className="coins-icon" />{selectedTask.coin_reward}
                    </p>

                    <p className={(history && selectedTask.overdue) ? "penalty-text" : (history && !selectedTask.overdue) ? "hide-penalty-text" : "view-penalty-text"}>Penalty: <FaCoins className="coins-icon" /> {selectedTask.coin_penalty} </p>

                    {(history && selectedTask.completion_status === 'completed') &&
                        <button className="command-button" onClick={() => handleUndoComplete(selectedTask)}>
                            Undo completion
                        </button>}
                    {(history && selectedTask.completion_status === 'incomplete') &&
                        <button className="command-button" onClick={() => handleCompleteHistoryTask(selectedTask)}>
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