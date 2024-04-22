import React, { useState } from 'react';
import './CompleteTask.css';
import { useDispatch } from 'react-redux';
import { Task } from '../../../types/types';
import { completeTask } from '../../../store/TasksSlice';
import { addToCoins } from '../../../store/RewardsSlice';
import { completeOverdueTask } from '../../../store/TasksSlice';

interface CompleteTaskProps {
    task: Task,
}

export const CompleteTask: React.FC<CompleteTaskProps> = ({ task }) => {
    const [isChecked, setIsChecked] = useState(false);

    const dispatch = useDispatch();


    const handleCompleteTask = () => {
        if (isChecked) {
            return;
        }
        setIsChecked(true);
   
        
        console.log(task);
        setTimeout(() => {
            if (!task.overdue) {
                dispatch(completeTask(task));
                dispatch(addToCoins(task.coinReward));
            } else {
                dispatch(completeOverdueTask(task));
                dispatch(addToCoins(task.coinReward));
            }
            setIsChecked(false);
        }, 1500)

    }
    

    return (
     
        <div className='checkbox-container'>
            <input type="checkbox" id={task.id} className='check-input' checked={isChecked} onChange={handleCompleteTask} />
            <label htmlFor={task.id} className={task.overdue ? "checkbox-overdue no-select" : "checkbox no-select"}>
                <svg viewBox='0 0 22 16' fill="none">
                    <path d="M1 6.85L8.09677 14L21 1" />
                </svg>
            </label>
        </div>
    )
}