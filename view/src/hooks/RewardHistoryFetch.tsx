import { useEffect } from "react";
import { getRewardHistory } from "../api/inventory";
import { useDispatch, useSelector } from "react-redux";
import { setUsedRewards } from "../store/RewardsSlice";
import { selectIsAuthenticated } from "../store/UserSlice";

export const useRewardHistoryFetch = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const rewardHistoryFetch = async () => {
            try {
               const rewardHistoryData = await getRewardHistory();
                dispatch(setUsedRewards(rewardHistoryData));
            } catch (error) {
                console.error(error);
            }
        } 
        if (isAuthenticated) {
              rewardHistoryFetch();
        }
      
    }, [dispatch, isAuthenticated])
}