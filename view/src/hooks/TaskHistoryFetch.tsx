import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getHistoryTasks } from "../api/tasks";
import { setHistoryTasks } from "../store/TasksSlice";

export const useTaskHistoryFetch = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchHistoryTasks = async () => {
            try {
                const historyTaskData = await getHistoryTasks();
                dispatch(setHistoryTasks(historyTaskData));
            } catch (error) {
                console.log(error);
            }
        }
        fetchHistoryTasks();
    }, [dispatch]);
}