import "./OverdueTasks.css";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../../components/Card/Card";
import { selectTasks } from "../../../store/TasksSlice";
import { TaskItem } from "../TaskItem/TaskItem";
import { subtractCoins } from "../../../store/RewardsSlice";
import { moveOverdueToHistory } from "../../../store/TasksSlice";
import { changeCompletionStatus } from "../../../api/tasks";

export const OverdueTasks = () => {

    const dispatch = useDispatch();
    const tasks = useSelector(selectTasks);
    const overdueTasks = tasks.filter(task => task.overdue);
    
    const handleAcceptPenalty = () => {
        overdueTasks.forEach(async task => {
            const moveToHistory = await changeCompletionStatus('incomplete', task.id, 'move-to-history');
            if (moveToHistory) {
                dispatch(moveOverdueToHistory(task));
                dispatch(subtractCoins(task.coin_penalty));
            } else return;
        })
    }



    return (
        <Card className="overdue-container overlay-card">
            <h4 id="overdue-tasks-heading">Overdue tasks</h4>
            <div className="overdue-task-items-container">
                {overdueTasks.map((task, index) => {
                return <TaskItem task={task} index={index} overdue={true}
                />
            })}
            </div>
            
            <button 
            className="command-button accept-penalty"
            onClick={handleAcceptPenalty}
            >Ok</button>
        </Card>
    )
}