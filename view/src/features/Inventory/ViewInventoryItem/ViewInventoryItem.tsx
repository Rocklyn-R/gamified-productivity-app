import React, {useState} from "react";
import './ViewInventoryItem.css';
import Card from "../../../components/Card/Card";
import { useDispatch } from "react-redux";
import { InventoryItem } from "../../../types/types";
import { FaCoins } from "react-icons/fa";
import { spendReward } from "../../../store/RewardsSlice";
import { renderIcon } from "../../../utilities/utilities";
import { QuantityInput } from "../../../components/QuantityInput/QuantityInput";


interface ViewInventoryItemProps {
    selectedInventoryItem: InventoryItem;
    hideInventoryItem: () => void;
}

export const ViewInventoryItem: React.FC<ViewInventoryItemProps> = ({ selectedInventoryItem, hideInventoryItem }) => {

    const [quantity, setQuantity] = useState(1);
    const [ showErrorMessage, setShowErrorMessage] = useState(false);

    const dispatch = useDispatch();

    const handleUseReward = () => {
        console.log(quantity);
        if (selectedInventoryItem.quantity < quantity) {
            setShowErrorMessage(true);
            return;
        }
        dispatch(spendReward({item: selectedInventoryItem, quantity: quantity}));
        hideInventoryItem();
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
            <p className='view-item-price-details'>Purchased for <FaCoins className="coins-icon view-coins-icon" />{selectedInventoryItem.price} </p>

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