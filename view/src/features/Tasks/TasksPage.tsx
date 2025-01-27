import { useState, useRef, useEffect } from 'react';
import Card from '../../components/Card/Card';
import './TasksPage.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { TaskForm } from './TaskForm/TaskForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasks, selectHistoryTasks } from '../../store/TasksSlice';
import { ViewTask } from './ViewTask/ViewTask';
import { Task } from "../../types/types";
import { TaskItem } from "./TaskItem/TaskItem";
import { GrHistory } from "react-icons/gr";
import { Link } from "react-router-dom";
import { markAsOverDue, setTasks } from '../../store/TasksSlice';
import { OverdueTasks } from './OverdueTasks/OverdueTasks';
import { selectTotalCoins } from '../../store/RewardsSlice';
import { FaCoins } from 'react-icons/fa';
import { day, date } from '../../utilities/utilities';
import { changeToOverDue } from '../../api/tasks';
import { useAuthorizationCheck } from '../../hooks/AuthorizationCheck';
import { selectIsAuthenticated } from '../../store/UserSlice';
import { getTasks } from '../../api/tasks';
import e from 'express';


export const Tasks = () => {
    useAuthorizationCheck();
    
    const tasks = useSelector(selectTasks);
    const [showForm, setShowForm] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>({
        name: "",
        notes: "",
        coin_reward: 0,
        id: "",
        deadline: "",
        coin_penalty: 0,
        overdue: false,
        completion_status: ''
    });
    const [selectedTaskDeleted, setSelectedTaskDeleted] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const overdueTasksOverlayRef = useRef<HTMLDivElement>(null);
    const historyTasks = useSelector(selectHistoryTasks);
    const overdueTasks = tasks.filter(task => task.overdue);
    const totalCoins = useSelector(selectTotalCoins)
    const dispatch = useDispatch();
    const [showOverdueTasks, setShowOverdueTasks] = useState(false);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
             const taskData = await getTasks();
             if (taskData) {
                 dispatch(setTasks(taskData));
                 setIsLoading(false);
             }
        };
        if (isAuthenticated && tasks.length === 0) {
           fetchTasks(); 
        } else {
            setIsLoading(false);
        }
    }, [dispatch, isAuthenticated]);


    const handleAddTaskClick = () => {
        setShowForm(!showForm);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowForm(false);
            setShowTask(false);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);


    useEffect(() => {
        // Check if the selected task is deleted from the tasks array
        if (selectedTask.id && !tasks.find(task => task.id === selectedTask.id)) {
            setSelectedTaskDeleted(true);
        } else {
            setSelectedTaskDeleted(false);
        }
    }, [tasks, selectedTask]);

    const handleViewTaskClick = (task: Task) => {
        setShowTask(true);
        setSelectedTask(task);
    }

    const handleHideTask = () => {
        setShowTask(false);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }

    useEffect(() => {
        const now = new Date();
        tasks.forEach(async task => {
            const deadline = new Date(task.deadline);
            if (deadline < now && !task.overdue) {
                const overdueUpdate = await changeToOverDue(task.id);
                if (overdueUpdate) {
                    dispatch(markAsOverDue(task));
                } else return;
            }
            setShowOverdueTasks(true);
        })
    });

    return (
        <>
            {historyTasks.length > 0 &&
                <div className='task-history-icon'>
                    <Link to="/tasks/history" className='task-history-link no-select' ><GrHistory className='history-icon' /></Link>
                </div>
            }
            <Card className="tasks-container">

                <div className="date-box">
                    <h1>{day},</h1>
                    <h1 id="date">{date}</h1>
                </div>
                <div className="coin-count-header">
                    <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
                </div>

                {tasks.length === 0 && !isLoading && <p className='add-tasks-message'>Add new tasks!</p>}
                <div className='todo-list'>
                    {tasks.filter(task => !task.overdue).map((task, index) => {
                        return <TaskItem task={task} key={index} index={index} handleViewTaskClick={handleViewTaskClick} />
                    })}
                </div>


                {(overdueTasks.length > 0 && showOverdueTasks) && (
                    <div className='overlay' ref={overdueTasksOverlayRef}>
                        <OverdueTasks />
                    </div>
                )}

                {showTask && !selectedTaskDeleted && (
                    <div className='overlay' ref={overlayRef}>
                        <ViewTask
                            selectedTask={selectedTask}
                            handleHideTask={handleHideTask}
                            history={false}
                        />
                    </div>
                )}

                {showForm && (
                    <div className="overlay" ref={overlayRef}>
                        <TaskForm
                            handleCloseForm={handleCloseForm}
                            isEditMode={false}
                        />
                    </div>
                )
                }
            </Card>
            <div className="add-task">
                <button className="no-select" onClick={handleAddTaskClick}><IoIosAddCircleOutline className="add-icon" /></button>
            </div>
        </>
    )
}