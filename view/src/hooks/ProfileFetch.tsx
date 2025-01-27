import { useEffect } from "react";
import { getUserDetails } from "../api/profile";
import { setFirstName, setLastName, setEmail, setGoogleLinked, selectIsAuthenticated, setPasswordExists } from "../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";



export const useProfileFetch = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        const getProfileDetails = async () => {
            const user = await getUserDetails();
            dispatch(setFirstName(user.first_name));
            dispatch(setLastName(user.last_name));
            dispatch(setEmail(user.email));
            console.log(user);
            if (user.google_id) {
                dispatch(setGoogleLinked(true));
            }
            if (!user.password) {           
                dispatch(setPasswordExists(false));
            }
        }
        if (isAuthenticated) {
          getProfileDetails();  
        }
    }, [dispatch, isAuthenticated])

}