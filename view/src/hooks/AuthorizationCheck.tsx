import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser, unauthenticateUser, selectIsAuthenticated } from "../store/UserSlice";
import { checkAuthentication } from "../api/login";

export const useAuthorizationCheck = (callback?: () => void) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const authorizationCheck = async () => {
      const authenticated = await checkAuthentication();
      if (authenticated && !isAuthenticated) {
        dispatch(authenticateUser());
      } else if (authenticated && isAuthenticated) {
        return;
      } else {
        dispatch(unauthenticateUser());
      }
      if (callback) {
        callback();
      }
    };

    authorizationCheck();
  }, [dispatch, isAuthenticated, callback]);
};