import React from 'react';
import { Task } from '../../../types/types';
import { CompleteTask } from '../CompleteTask/CompleteTask';
import "./task-item.css";
import { formatDeadline } from '../../../utilities/utilities';
import { FaCoins } from 'react-icons/fa';

interface TaskItemProps {
    task: Task,
    index: number,
    handleViewTaskClick?: (task: Task) => void;
    history?: boolean,
    overdue?: boolean
}



export const TaskItem: React.FC<TaskItemProps> = ({ task, index, handleViewTaskClick, history, overdue }) => {



    return (

        <div className='to-do-element'>
            {!history && <CompleteTask task={task} />}
            <button
                key={index}
                className={overdue ? "overdue-task-button no-select" : "view-task no-select"}
                onClick={() => { if(handleViewTaskClick) {
                     handleViewTaskClick(task)
                } }}
            >
                <div>
                    <p id="task-name-text">{task.name}</p>
                </div>

                <div className='deadline-details'>

                    <p>
                        {task.deadline && `Due: ` + formatDeadline(task.deadline)}
                    </p>

                </div>
                {(task.deadline && task.overdue && !history) && (
                    <div className='status-box'>
                        <p id="overdue-text">OVERDUE</p>
                        {task.coin_penalty > 0 && (
                            <div className='coin-penalty-box'>
                                <p>-<FaCoins className='coins-icon' />{task.coin_penalty}</p>
                            </div>

                        )}

                    </div>
                )}
                 {(task.completion_status === 'incomplete' && history) && (
                    <div className='status-box'>
                        <p id="overdue-text">NOT COMPLETED</p>
                        {task.coin_penalty > 0 && (
                            <div className='coin-penalty-box'>
                                <p>-<FaCoins className='coins-icon' />{task.coin_penalty}</p>
                            </div>

                        )}

                    </div>
                )}
                {(history && task.completion_status === 'completed') && (
                    <div className='status-box'>
                        <p id="completed-text">COMPLETED</p>
                        {task.coin_reward > 0 && (
                            <div className='coin-penalty-box'>
                                <p>+<FaCoins className='coins-icon' />{task.coin_reward}</p>
                            </div>

                        )}
                    </div>
                )}

            </button>
        </div>)
}