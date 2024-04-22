import React from "react";
import Card from "../Card/Card";
import "./DeleteMessage.css";
import { Reward, Task } from "../../types/types";
import { useDispatch } from "react-redux";
import { deleteTask, deleteTaskFromHistory } from "../../store/TasksSlice";
import { deleteItemFromShop } from "../../store/RewardsSlice";


interface DeleteMessageProps {
    hideDeleteMessage: () => void;
    selectedTask?: Task;
    selectedReward?: Reward;
    history?: boolean;
    handleHideTask?: () => void;
    handleHideReward?: () => void;
}

export const DeleteMessage: React.FC<DeleteMessageProps> = ({
    hideDeleteMessage,
    selectedTask,
    history,
    handleHideTask,
    selectedReward,
    handleHideReward
}) => {

    const dispatch = useDispatch();


    const handleDelete = () => {
        if (!history && selectedTask) {
            dispatch(deleteTask(selectedTask));
        } else if (history && selectedTask && handleHideTask) {
            dispatch(deleteTaskFromHistory(selectedTask));
            handleHideTask();
        }

        if (selectedReward && handleHideReward) {
            dispatch(deleteItemFromShop(selectedReward));
            handleHideReward();
        }

        hideDeleteMessage();
    }

    return (
        <Card className="delete-message-container" >
            <h4>Delete</h4>
            {selectedTask && <p>Do you really wish to delete this task{history && " from your history"}?</p>}
            {selectedReward && <p>Do you really wish to delete this item?</p>}
            <button className="command-button" onClick={hideDeleteMessage}>Cancel</button>
            <button className="command-button" onClick={handleDelete}>Delete</button>
        </Card>
    )
}