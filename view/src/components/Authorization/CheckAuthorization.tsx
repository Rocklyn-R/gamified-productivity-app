import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuthorization } from "../../api/login";
import { authenticateUser, unauthenticateUser } from "../../store/UserSlice";

export const CheckAuthorization = (routePath: string) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await checkAuthorization(routePath);
            
            if (isAuthenticated && (routePath !== 'login')) {
                dispatch(authenticateUser());
                navigate(`/${routePath}`);
            } else if (!isAuthenticated && (routePath === 'login')) {
                dispatch(authenticateUser());
                navigate(`/tasks`)
            } else {
                dispatch(unauthenticateUser());
                navigate(`/login`)
            }
        }
        checkAuthentication();
    }, [navigate, routePath]);
}