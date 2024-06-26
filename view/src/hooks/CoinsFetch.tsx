import { useEffect } from "react";
import { getCoins } from "../api/coins";
import { useDispatch, useSelector } from "react-redux";
import { setCoins } from "../store/RewardsSlice";
import { selectIsAuthenticated } from "../store/UserSlice";


export const useCoinsFetch = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const fetchedCoins = await getCoins();
                dispatch(setCoins(fetchedCoins));
            } catch (error) {
                console.log(error);
            }
        }
        if (isAuthenticated) {
         fetchCoins();   
        }
        
    }, [dispatch, isAuthenticated]);
}