import React, { useState, useRef, useEffect } from 'react';
import Card from '../../../components/Card/Card';
import { selectHistoryTasks } from '../../../store/TasksSlice';
import { useSelector, useDispatch } from 'react-redux';
import { TaskItem } from '../TaskItem/TaskItem';
import "./TaskHistory.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { Task } from '../../../types/types';
import { ViewTask } from '../ViewTask/ViewTask';
import { selectTotalCoins } from '../../../store/RewardsSlice';
import { FaCoins } from 'react-icons/fa';
import { useTaskHistoryFetch } from '../../../hooks/TaskHistoryFetch';
import { useAuthorizationCheck } from '../../../hooks/AuthorizationCheck';

export const TaskHistory = () => {
    useAuthorizationCheck();
    useTaskHistoryFetch();
    const historyTasks = useSelector(selectHistoryTasks);
    const totalCoins = useSelector(selectTotalCoins)
    const [viewHistoryTask, setViewHistoryTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>({
        name: "",
        notes: "",
        coin_reward: 0,
        id: "",
        deadline: "",
        coin_penalty: 0,
        overdue: false,
        completion_status: ''
    })
    const overlayRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleViewHistoryTask = (task: Task) => {
        setViewHistoryTask(true);
        setSelectedTask(task);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setViewHistoryTask(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    useEffect(() => {
        if (historyTasks.length === 0) {
            navigate('../tasks'); // Use navigate to navigate
        }
    }, [historyTasks, navigate]);

    const handleHideTask = () => {
        setViewHistoryTask(false);
    }

    return (
        <>
            <Link to="../tasks"><IoArrowBackOutline className="back-icon" /></Link>
            <Card className="tasks-container">
                <h1 id="task-history-heading"> TASK HISTORY </h1>
                <div className="coin-count-header">
                    <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
                </div>
                {historyTasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        index={index}
                        history={true}
                        handleViewTaskClick={handleViewHistoryTask}
                    />
                ))}
                {viewHistoryTask &&
                    <div className='overlay' ref={overlayRef}>

                        <ViewTask
                            selectedTask={selectedTask}
                            handleHideTask={handleHideTask}
                            history={true}
                        />
                    </div>
                }
            </Card>
        </>

    )
}