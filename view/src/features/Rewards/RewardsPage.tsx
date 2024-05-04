import React, { useState, useRef, useEffect } from 'react';
import "./RewardsPage.css";
import Card from "../../components/Card/Card";
import { selectTotalCoins, selectItemsInShop } from '../../store/RewardsSlice';
import { useSelector } from 'react-redux';
import { FaCoins } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ItemForm } from './ItemForm/ItemForm';
import { RewardItem } from './RewardItem/RewardItem';
import { ViewReward } from './ViewReward/ViewReward';
import { Reward } from '../../types/types';
import { useAuthorizationCheck } from '../../hooks/AuthorizationCheck';


export const RewardsPage = () => {
    useAuthorizationCheck();
    
    const totalCoins = useSelector(selectTotalCoins);
    const [showForm, setShowForm] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const shopItems = useSelector(selectItemsInShop);
    const [showReward, setShowReward] = useState(false);
    const [selectedReward, setSelectedReward] = useState({
        name: "",
        price: 0,
        description: "",
        id: "",
        icon: ""
    });


    const handleAddNewItem = () => {
        setShowForm(true);
    }

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowForm(false);
            setShowReward(false);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);

    const handleViewReward = (reward: Reward) => {
        setShowReward(true);
        setSelectedReward(reward);
        console.log(selectedReward);
    }

    const handleHideReward = () => {
        setShowReward(false);
    }

    const handleCloseForm = () => {
        setShowForm(false);
    }


    return (
        <>
            <Card className="rewards-box">
                <h1 className="rewards-header">REWARDS SHOP</h1>
                <div className="coin-count-header">
                    <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
                </div>
                {shopItems.map((item, index) =>
                    <RewardItem reward={item} key={index} index={index} handleViewReward={handleViewReward} inventory={false} />
                )}

                {showForm && (
                    <div className="overlay" ref={overlayRef}>
                        <ItemForm
                            handleCloseForm={handleCloseForm}
                            isEditMode={false}
                        />
                    </div>
                )
                }

                {showReward && (
                    <div className='overlay' ref={overlayRef}>
                        <ViewReward
                            selectedReward={selectedReward}
                            handleHideReward={handleHideReward}
                        />
                    </div>
                )
                }

            </Card>
            <div className="add-reward">
                <button className='no-select' onClick={() => handleAddNewItem()}><IoIosAddCircleOutline /></button>
            </div>
        </>


    )
}