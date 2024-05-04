import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/Card/Card";
import "./InventoryPage.css";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router-dom";
import { selectTotalCoins, selectInventory, selectUsedRewards, setInventory } from "../../store/RewardsSlice";
import { useSelector, useDispatch } from "react-redux";
import { RewardItem } from "../Rewards/RewardItem/RewardItem";
import { ViewInventoryItem } from "./ViewInventoryItem/ViewInventoryItem";
import { InventoryItem } from "../../types/types";
import { GrHistory } from "react-icons/gr";
import { useAuthorizationCheck } from "../../hooks/AuthorizationCheck";
import { selectIsAuthenticated } from "../../store/UserSlice";
import { getInventoryItems } from "../../api/inventory";

export const InventoryPage = () => {
    useAuthorizationCheck();

    const totalCoins = useSelector(selectTotalCoins);
    const inventory = useSelector(selectInventory);
    const [showItemDetails, setShowItemDetails] = useState(false);
    const [selectedInventoryItem, setSelectedInventoryItem] = useState({
        name: "",
        price: 0,
        description: "",
        id: "",
        icon: "",
        quantity: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const inventoryData = await getInventoryItems();
            if (inventoryData) {
                dispatch(setInventory(inventoryData));
                setIsLoading(false);
            };
        };

        if (isAuthenticated && inventory.length === 0) {
            fetchInventoryItems();
        } else {
            setIsLoading(false);
        }
    }, [dispatch, isAuthenticated]);


    const usedRewards = useSelector(selectUsedRewards)

    const overlayRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowItemDetails(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);


    const hideInventoryItem = () => {
        setShowItemDetails(false);
    }


    const handleViewInventoryItem = (item: InventoryItem) => {
        setShowItemDetails(true);
        setSelectedInventoryItem(item)
    }

    return (
        <>
                {usedRewards.length > 0 && (
                    <div className='inventory-history-icon'>
                        <Link to="/inventory/history" ><GrHistory className='history-icon' /></Link>
                    </div>
                )}
                <Card className="inventory-box">
                    <h1 className="rewards-header">INVENTORY</h1>
                    <div className="coin-count-header">
                        <h1><FaCoins className='coin-icon' /> {totalCoins}</h1>
                    </div>
                    {inventory.length === 0 && !isLoading && (
                        <p className="inventory-empty-message">Inventory empty! Create and buy rewards in the shop!</p>
                    )}
                    {inventory.map((item, index) => (
                        <RewardItem
                            key={index}
                            index={index}
                            reward={item}
                            handleViewInventoryItem={handleViewInventoryItem}
                            inventory={true}
                        />
                    ))}

                    {showItemDetails && (
                        <div className='overlay' ref={overlayRef}>
                            <ViewInventoryItem
                                selectedInventoryItem={selectedInventoryItem}
                                hideInventoryItem={hideInventoryItem}
                            />
                        </div>
                    )}
                </Card>
        </>
    )
}