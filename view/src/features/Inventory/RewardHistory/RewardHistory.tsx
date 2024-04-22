import React from 'react';
import "./RewardHistory.css";
import Card from '../../../components/Card/Card';
import { selectUsedRewards } from '../../../store/RewardsSlice';
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { renderIcon } from '../../../utilities/utilities';
import { formatDate } from '../../../utilities/utilities';

export const RewardHistory = () => {
    const usedRewards = useSelector(selectUsedRewards);

    return (

    <>
    <Link to="../inventory"><IoArrowBackOutline className="back-icon" /></Link>
    <Card className="rewards-history">
            <h1>REWARD HISTORY</h1>
            {usedRewards.map(item => (
                <div className='inventory-history-box'>
                    <div className='history-container-1'>
                        <img alt="" src={renderIcon(item.icon)} height="24" />
                        <div className='history-container-2'>
                            <p>{item.name}</p>
                            <p className='reward-description'>{item.description}</p>
                        </div>
                    </div>
                    <div className='history-date-used'>
                        <p>Used:</p>
                        <p className='reward-description'>{formatDate(item.dateUsed)}</p>
                    </div>
                </div>

            ))}
        </Card>
    </>
        
    )
}