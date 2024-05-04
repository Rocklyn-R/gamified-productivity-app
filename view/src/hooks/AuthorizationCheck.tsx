import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, unauthenticateUser, selectIsAuthenticated } from "../store/UserSlice";
import { checkAuthentication } from "../api/login";

export const useAuthorizationCheck = (callback?: () => void, callback2?: () => void) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    const authorizationCheck = async () => {
      try {
        const authenticated = await checkAuthentication();
        if (authenticated && !isAuthenticated) {
          dispatch(authenticateUser());
          if (callback2) {
            callback2();
          }
        } else if (authenticated && isAuthenticated){
          return;
        } else {
          dispatch(unauthenticateUser());
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        if (callback) {
          callback();
        }
      }
    };
    
    // Trigger authentication check when component mounts or when isAuthenticated changes
    authorizationCheck();
  }, [dispatch, callback, callback2, isAuthenticated]);
};