import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShopItems } from "../api/shop";
import { setShopItems } from "../store/RewardsSlice";
import { selectIsAuthenticated } from "../store/UserSlice";

export const useRewardsFetch = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const shopData = await getShopItems();
                dispatch(setShopItems(shopData))
            } catch (error) {
                throw error;
            }

        }
        if (isAuthenticated) {
           fetchRewards(); 
        }
        
    }, [dispatch, isAuthenticated]);
}