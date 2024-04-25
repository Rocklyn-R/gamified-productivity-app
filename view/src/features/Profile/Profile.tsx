import "./Profile.css";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/profile";
import { setFirstName, setLastName, setEmail } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFirstName, selectLastName, selectEmail } from "../../store/UserSlice";
import { CheckAuthorization } from "../../components/Authorization/CheckAuthorization";
import { FaRegEdit } from "react-icons/fa";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FaCheck } from "react-icons/fa6";
import { updateUserName } from "../../api/profile";
import { FaXmark } from "react-icons/fa6";
import { NameForm } from "./ProfileForms/NameForm";
import { EmailForm } from "./ProfileForms/EmailForm";
import { PasswordForm } from "./ProfileForms/PasswordForm";




export const Profile = () => {
    CheckAuthorization('profile');

    const dispatch = useDispatch();
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [firstNameLocal, setFirstNameLocal] = useState('');
    const [lastNameLocal, setLastNameLocal] = useState('');
    const [emailLocal, setEmailLocal] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState("");

    useEffect(() => {
        const getProfileDetails = async () => {
            const user = await getUserDetails();
            dispatch(setFirstName(user.first_name));
            dispatch(setLastName(user.last_name));
            dispatch(setEmail(user.email));
            setFirstNameLocal(user.first_name);
            setLastNameLocal(user.last_name);
            setEmailLocal(user.email);
        }

        getProfileDetails();
    }, [])

    const handleEditName = () => {
        setEditName(true);
    }


    return (
        <Card className="account-details-container">
            <h1>Account Details</h1>

            {editName ? (
                <div className="account-details-form-container">
                    <NameForm
                        firstNameLocal={firstNameLocal}
                        lastNameLocal={lastNameLocal}
                        setEditName={setEditName}
                        setFirstNameLocal={setFirstNameLocal}
                        setLastNameLocal={setLastNameLocal}
                    />
                </div>


            ) : (
                <div className="username-container">
                    <p>Name: {firstName} {lastName}</p>
                    <button onClick={handleEditName}><FaRegEdit /></button>
                </div>
            )}
            {editEmail ? (
                <div className="account-details-form-container">
                    <EmailForm
                        emailLocal={emailLocal}
                        setEmailLocal={setEmailLocal}
                        setEditEmail={setEditEmail}
                    />
                </div>
            ) : (
                <div className="user-email-container">
                    <p>Email: {email}</p>
                    <button onClick={() => setEditEmail(true)}><FaRegEdit /></button>
                </div>
            )}

            {editPassword ? (
                <div className="account-details-form-container">
                    <PasswordForm 
                        setEditPassword={setEditPassword}
                    />
                </div>
            ) : (
                <div className="user-password-container">
                    <p>Password: ******** </p>
                    <button onClick={() => setEditPassword(true)}><FaRegEdit /></button>
                </div>
            )}


        </Card>
    )
}