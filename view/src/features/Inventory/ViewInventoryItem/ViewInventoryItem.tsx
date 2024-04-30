import React, { useState } from "react";
import './ViewInventoryItem.css';
import Card from "../../../components/Card/Card";
import { useDispatch } from "react-redux";
import { InventoryItem } from "../../../types/types";
import { FaCoins } from "react-icons/fa";
import { spendReward } from "../../../store/RewardsSlice";
import { renderIcon } from "../../../utilities/utilities";
import { QuantityInput } from "../../../components/QuantityInput/QuantityInput";
import { spendInventoryItem } from "../../../api/inventory";
import { addToRewardHistory } from "../../../api/inventory";
import { v4 as uuidv4 } from "uuid";
import { getFormattedDate } from "../../../utilities/utilities";

interface ViewInventoryItemProps {
    selectedInventoryItem: InventoryItem;
    hideInventoryItem: () => void;
}

export const ViewInventoryItem: React.FC<ViewInventoryItemProps> = ({ selectedInventoryItem, hideInventoryItem }) => {

    const [quantity, setQuantity] = useState(1);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const dispatch = useDispatch();
    
    const newItemWithNewId = {
        name: selectedInventoryItem.name,
        price: selectedInventoryItem.price,
        description: selectedInventoryItem.description,
        id: uuidv4(),
        icon: selectedInventoryItem.icon,
        quantity: selectedInventoryItem.quantity
    }

    const handleUseReward = async () => {
        if (selectedInventoryItem.quantity < quantity) {
            setShowErrorMessage(true);
            return;
        }
        const useItem = await spendInventoryItem(selectedInventoryItem.id, quantity);
        if (useItem) {
            const id = uuidv4();
            const newItemWithNewId = {
                name: selectedInventoryItem.name,
                price: selectedInventoryItem.price,
                description: selectedInventoryItem.description,
                id: id,
                icon: selectedInventoryItem.icon,
                quantity: selectedInventoryItem.quantity
            }
            const date_used = getFormattedDate();
            await addToRewardHistory(id, selectedInventoryItem.id, date_used)
            dispatch(spendReward({ item: newItemWithNewId, quantity: quantity }));
            hideInventoryItem();
        }
    }



    return (
        <Card className="view-inventory-item-container overlay-card">
            <button
                type="button"
                className='close'
                onClick={() => hideInventoryItem()}
            >
                X
            </button>
            <img alt="" src={renderIcon(selectedInventoryItem.icon)} height="40" width="40" />
            <p>Name: {selectedInventoryItem.name}</p>
            {selectedInventoryItem.description && <p>Description: {selectedInventoryItem.description}</p>}
            {selectedInventoryItem.quantity > 1 && (
                <QuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                    maxQuantity={selectedInventoryItem.quantity}
                />

            )}
            {showErrorMessage && (
                <p id="not-enough-items">Not enough items to use.</p>
            )}
            <div className="command-button-container">
                <button className="command-button" onClick={handleUseReward} >Use</button>
            </div>

        </Card>
    )
}