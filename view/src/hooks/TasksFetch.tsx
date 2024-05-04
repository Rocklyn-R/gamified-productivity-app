import { useEffect } from "react";
import { setTasks } from "../store/TasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../api/tasks";
import { selectIsAuthenticated } from "../store/UserSlice";

export const useTasksFetch = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const taskData = await getTasks();
                dispatch(setTasks(taskData))
            } catch (error) {
                console.log(error);
            }
        }
        if (isAuthenticated) {
           fetchTasks();
 
        }
    }, [dispatch, isAuthenticated]);
}