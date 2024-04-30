import { useEffect } from "react";
import { getCoins } from "../api/coins";
import { useDispatch } from "react-redux";
import { setCoins } from "../store/RewardsSlice";


export const useCoinsFetch = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const fetchedCoins = await getCoins();
                dispatch(setCoins(fetchedCoins));
            } catch (error) {
                console.log(error);
            }
        }
        fetchCoins();
    }, [dispatch]);
}