import React from "react";
import Card from "../Card/Card";
import "./DeleteMessage.css";
import { Reward, Task, UsedRewards } from "../../types/types";
import { useDispatch } from "react-redux";
import { removeTask, deleteTaskFromHistory } from "../../store/TasksSlice";
import { deleteItemFromShop } from "../../store/RewardsSlice";
import { deleteTask } from "../../api/tasks";
import { deleteShopItem } from "../../api/shop";
import { deleteFromRewardHistory } from "../../api/inventory";
import { deleteUsedReward } from "../../store/RewardsSlice";


interface DeleteMessageProps {
    hideDeleteMessage: () => void;
    selectedTask?: Task;
    selectedReward?: Reward;
    history?: boolean;
    handleHideTask?: () => void;
    handleHideReward?: () => void;
    rewardHistory?: boolean;
    itemToDelete?: UsedRewards;
}

export const DeleteMessage: React.FC<DeleteMessageProps> = ({
    hideDeleteMessage,
    selectedTask,
    history,
    handleHideTask,
    selectedReward,
    handleHideReward,
    rewardHistory,
    itemToDelete
}) => {

    const dispatch = useDispatch();


    const handleDelete = async () => {
        if (!history && selectedTask && handleHideTask) {
            const id = selectedTask.id;
            const taskDeletion = await deleteTask(id);
            if (taskDeletion) {
                dispatch(removeTask(selectedTask));
                handleHideTask();
            }
        } else if (history && selectedTask && handleHideTask) {
            const taskDeletion = await deleteTask(selectedTask.id);
            if (taskDeletion) {
                dispatch(deleteTaskFromHistory(selectedTask));
                handleHideTask();
            }
        }

        if (selectedReward && handleHideReward) {
            const shopItemDeletion = await deleteShopItem(selectedReward.id);
            if (shopItemDeletion) {
                dispatch(deleteItemFromShop(selectedReward));
                handleHideReward();
            }
        }

        if (rewardHistory && itemToDelete) {
            const deletion = await deleteFromRewardHistory(itemToDelete.id);
            if (deletion) {
                dispatch(deleteUsedReward(itemToDelete))
            }
        }

        hideDeleteMessage();
    }

    return (
        <Card className="delete-message-container" >
            <h4>Delete</h4>
            {selectedTask && <p>Do you really wish to delete this task{history && " from your history"}?</p>}
            {selectedReward && <p>Do you really wish to delete this item?</p>}
            {rewardHistory && <p>Do you really wish to delete this item from your history?</p>}
            <button className="command-button" onClick={hideDeleteMessage}>Cancel</button>
            <button className="command-button" onClick={handleDelete}>Delete</button>
        </Card>
    )
}