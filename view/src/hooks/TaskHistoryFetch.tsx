import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHistoryTasks } from "../api/tasks";
import { setHistoryTasks } from "../store/TasksSlice";
import { selectIsAuthenticated } from "../store/UserSlice";
import { useNavigate } from "react-router-dom";

export const useTaskHistoryFetch = (callback?: () => void) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    useEffect(() => {
        const fetchHistoryTasks = async () => {
            try {
                const historyTaskData = await getHistoryTasks();
                dispatch(setHistoryTasks(historyTaskData));
            } catch (error) {
                console.log(error);
            }
        }
        if (isAuthenticated) {
           fetchHistoryTasks(); 
           if (callback) {
            callback();
           }
        }
    }, [dispatch, isAuthenticated]);
}