import { useEffect } from "react";
import { getRewardHistory } from "../api/inventory";
import { useDispatch } from "react-redux";
import { setUsedRewards } from "../store/RewardsSlice";

export const useRewardHistoryFetch = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const rewardHistoryFetch = async () => {
            try {
               const rewardHistoryData = await getRewardHistory();
                dispatch(setUsedRewards(rewardHistoryData));
            } catch (error) {
                console.error(error);
            }
        } 
        rewardHistoryFetch();
    }, [dispatch])
}