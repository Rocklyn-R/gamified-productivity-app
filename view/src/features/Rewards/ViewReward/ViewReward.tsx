import React, { useState } from 'react';
import Card from '../../../components/Card/Card';
import "./ViewReward.css";
import { FaCoins, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Reward } from '../../../types/types';
import { ItemForm } from '../ItemForm/ItemForm';
import { DeleteMessage } from '../../../components/DeleteMessage/DeleteMessage';
import { buyItem, selectTotalCoins } from '../../../store/RewardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { renderIcon } from '../../../utilities/utilities';
import { QuantityInput } from '../../../components/QuantityInput/QuantityInput';

interface ViewRewardProps {
    selectedReward: Reward;
    handleHideReward: () => void;
}

export const ViewReward: React.FC<ViewRewardProps> = ({ selectedReward, handleHideReward }) => {

    const [editMode, setEditMode] = useState(false);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const [purchaseFailed, setPurchaseFailed] = useState(false);
    const totalCoins = useSelector(selectTotalCoins);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);


    const handleEditReward = () => {
        setEditMode(true);
    }

    const handleCloseForm = () => {
        setEditMode(false);
    }

    const handleDeleteItem = () => {
        setShowDeleteMessage(true);
        setEditMode(true);
    }

    const hideDeleteMessage = () => {
        setShowDeleteMessage(false);
        setEditMode(false);
    }

    const handleBuyItem = () => {
        if (selectedReward.price > totalCoins || (selectedReward.price * quantity > totalCoins)) {
            setPurchaseFailed(true);
        } else {
            dispatch(buyItem({ reward: selectedReward, quantity: quantity }));
            handleHideReward();
        }
    }

    return (
        <>
            {!editMode && (

                <Card className="view-rewards-container overlay-card">
                    <button
                        className="close"
                        onClick={handleHideReward}
                    >
                        X
                    </button>

                    <div className="edit-delete-buttons">

                        <button
                            className="edit-reward"
                            onClick={handleEditReward}
                        >
                            <FaRegEdit className="edit-reward-icon" /></button>


                        <button
                            className="delete-reward"
                            onClick={handleDeleteItem}
                        >
                            <MdDeleteOutline className='delete-reward-icon' />
                        </button>
                    </div>
                    <img alt="" src={renderIcon(selectedReward.icon)} height="40" width="40" />
                    <p className="reward-name">
                        Name: {selectedReward.name}
                    </p>
                    {selectedReward.description && (
                        <p className='item-description'>
                            Description: {selectedReward.description}
                        </p>
                    )}

                    <p className='view-item-price-details'>
                        Price: <FaCoins className='coins-icon view-coins-icon' />{selectedReward.price}
                    </p>

                    <QuantityInput
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />

                    {purchaseFailed && (
                        <p id="not-enough-coins">Not enough coins!</p>
                    )}
                    <div className="command-button-container">
                        <button
                            className='command-button'
                            onClick={handleBuyItem}
                        >
                            Buy
                        </button>
                    </div>
                </Card>
            )}

            {editMode && showDeleteMessage && (
                <DeleteMessage
                    hideDeleteMessage={hideDeleteMessage}
                    selectedReward={selectedReward}
                    handleHideReward={handleHideReward}
                />
            )}

            {editMode && !showDeleteMessage && (
                <ItemForm
                    isEditMode={true}
                    handleCloseForm={handleCloseForm}
                    selectedReward={selectedReward}
                    handleHideReward={handleHideReward}
                />
            )}

        </>


    )
}