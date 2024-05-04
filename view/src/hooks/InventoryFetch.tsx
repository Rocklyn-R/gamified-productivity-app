import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryItems } from "../api/inventory";
import { setInventory } from "../store/RewardsSlice";
import { selectIsAuthenticated } from "../store/UserSlice";

export const useInventoryFetch = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const inventoryData = await getInventoryItems();
            if (inventoryData) {
                dispatch(setInventory(inventoryData))
            };
        };

        if (isAuthenticated) {
            fetchInventoryItems();
        }


    }, [dispatch, isAuthenticated])
}