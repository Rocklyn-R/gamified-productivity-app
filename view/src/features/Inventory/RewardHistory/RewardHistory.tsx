import React, { useEffect, useState, useRef } from 'react';
import "./RewardHistory.css";
import Card from '../../../components/Card/Card';
import { selectUsedRewards } from '../../../store/RewardsSlice';
import { useSelector } from 'react-redux';
import { IoArrowBackOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { renderIcon } from '../../../utilities/utilities';
import { formatDate } from '../../../utilities/utilities';
import { useRewardHistoryFetch } from '../../../hooks/RewardHistoryFetch';
import { useAuthorizationCheck } from '../../../hooks/AuthorizationCheck';
import { MdDeleteOutline } from "react-icons/md";
import { DeleteMessage } from '../../../components/DeleteMessage/DeleteMessage';
import { UsedRewards } from '../../../types/types';


export const RewardHistory = () => {
    useAuthorizationCheck();
    useRewardHistoryFetch();

    const usedRewards = useSelector(selectUsedRewards);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false)
    const overlayRef = useRef<HTMLDivElement>(null);
    const [itemToDelete, setItemToDelete] = useState({
        name: "",
        price: 0,
        description: "",
        id: "",
        icon: "",
        date_used: ""
    })


    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowDeleteMessage(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    const handleDeleteClick = () => {
        setShowDeleteMessage(true);
    }

    const hideDeleteMessage = () => {
        setShowDeleteMessage(false)
    }

    const handleDeleteButtonClick = (item: UsedRewards) => {
        setItemToDelete(item);
        setShowDeleteMessage(true);
    }

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
                    <div className='date-used-delete-container'>
                        <div className='history-date-used'>
                        <p>Used:</p>
                        <p className='reward-description'>{item.date_used}</p>
                    </div>
                    <button onClick={() => handleDeleteButtonClick(item)} className='delete-task history-delete-button'><MdDeleteOutline className='delete-reward-icon' /></button>
                    </div>
                    
                </div>
            ))}
              {showDeleteMessage &&
             <div className="overlay" ref={overlayRef}>
               <DeleteMessage hideDeleteMessage={hideDeleteMessage} rewardHistory={true} itemToDelete={itemToDelete} />
             </div>}
            
        </Card>
    </>
        
    )
}