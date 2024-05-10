import React from "react";
import "./RewardItem.css";
import { InventoryItem, Reward } from "../../../types/types";
import { FaCoins } from "react-icons/fa";
import { renderIcon } from "../../../utilities/utilities";

interface RewardItemProps {
    reward: Reward | InventoryItem;
    index: number;
    handleViewReward?: (reward: Reward) => void;
    handleViewInventoryItem?: (reward: InventoryItem) => void;
    inventory: boolean;
}

export const RewardItem: React.FC<RewardItemProps> = ({ reward, index, handleViewReward, inventory, handleViewInventoryItem }) => {

    const handleViewItem = () => {
        if (handleViewReward) {
            handleViewReward(reward as Reward)
        } else if (handleViewInventoryItem) {
            handleViewInventoryItem(reward as InventoryItem)
        }
    }

    return (
        <div className="reward-item">
            <button
                className="view-reward no-select"
                onClick={() => handleViewItem()}
            >
                <div className="icon-container">
                    <img alt="" src={renderIcon(reward.icon)}  />
                    </div>    
                    <div className={inventory ? 'inventory-reward-details' : 'reward-details'}>
                        <p>{reward.name}</p>
                        <p className="reward-description">{reward.description}</p>
                    </div>
            

                {!inventory && (
                    <div className="price-details">
                        <FaCoins className="coins-icon" />
                        <p>{reward.price}</p>
                    </div>
                )}

                {inventory && (
                    <div className="reward-quantity">
                        <p id="reward-quantity">Quantity: {(reward as InventoryItem).quantity}</p>
                    </div>
                )}

            </button>
        </div>
    )
}