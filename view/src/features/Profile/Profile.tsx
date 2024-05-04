import "./Profile.css";
import Card from "../../components/Card/Card";
import { useEffect, useState, useRef } from "react";
import { selectGoogleLinked, selectPasswordExists } from "../../store/UserSlice";
import { useSelector } from "react-redux";
import { selectFirstName, selectLastName, selectEmail } from "../../store/UserSlice";
import { FaRegEdit } from "react-icons/fa";
import { NameForm } from "./ProfileForms/NameForm";
import { EmailForm } from "./ProfileForms/EmailForm";
import { PasswordForm } from "./ProfileForms/PasswordForm";
import { useAuthorizationCheck } from "../../hooks/AuthorizationCheck";
import GoogleButton from 'react-google-button'
import { CreatePasswordForm } from "./ProfileForms/CreatePasswordForm";
import { UnlinkMessage } from "./UnlinkMessage/UnlinkMessage";


export const Profile = () => {
    useAuthorizationCheck();
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const googleLinked = useSelector(selectGoogleLinked);
    const passwordExists = useSelector(selectPasswordExists);
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [firstNameLocal, setFirstNameLocal] = useState(firstName);
    const [lastNameLocal, setLastNameLocal] = useState(lastName);
    const [emailLocal, setEmailLocal] = useState(email);
    const [passwordChangeStatusMessage, setPasswordChangeStatusMessage] = useState('');
    const [googleSignIn, setGoogleSignIn] = useState(googleLinked);
    const [createPassword, setCreatePassword] = useState(false);
    const [noPassword, setNoPassword] = useState(passwordExists);
    const [showUnlinkMessage, setShowUnlinkMessage] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);


    const handleEditName = () => {
        setEditName(true);
    }

    useEffect(() => {
        if (passwordChangeStatusMessage === 'Password successfully changed!') {
            const timer = setTimeout(() => {
                setPasswordChangeStatusMessage('');
            }, 2000);

            return () => clearTimeout(timer);
        }
        if (!editPassword) {
            setPasswordChangeStatusMessage('')
        }
    }, [passwordChangeStatusMessage, editPassword])

    const handleOverlayClick = (event: MouseEvent) => {
        if (event.target === overlayRef.current) {
            setShowUnlinkMessage(false)
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleOverlayClick);

        return () => {
            document.removeEventListener('mousedown', handleOverlayClick);
        };
    }, []);


    return (
        <Card className="account-details-container">
            <h1 className="main-app-header">Account Details</h1>

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
                <div className={googleSignIn ? "user-name-container-google" : "username-container"}>
                    <p>Name: {firstName} {lastName}</p>
                    {!googleSignIn && <button onClick={handleEditName}><FaRegEdit /></button>}
                </div>
            )}
            {!googleSignIn && (
                editEmail ? (
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
                ))}
            {!noPassword && (
                editPassword ? (
                    <div className="account-details-form-container">
                        <PasswordForm
                            setEditPassword={setEditPassword}
                            statusMessage={passwordChangeStatusMessage}
                            setStatusMessage={setPasswordChangeStatusMessage}
                        />
                    </div>
                ) : (
                    <div className="user-password-container">
                        <p>Password: ******** </p>
                        <button onClick={() => setEditPassword(true)}><FaRegEdit /></button>
                    </div>
                )
            )
            }
            {passwordChangeStatusMessage && <p>{passwordChangeStatusMessage}</p>}
            {googleSignIn && noPassword && (
                createPassword ? (
                    <>
                        <p>Create a new password:</p>
                        <div className="create-password-container">
                            <CreatePasswordForm
                                setCreatePassword={setCreatePassword}
                                setNoPassword={setNoPassword}
                            />
                        </div>

                    </>
                ) : (
                    <div className="user-password-container">
                        <p>Password: (none)</p>
                        <button onClick={() => setCreatePassword(true)}><FaRegEdit /></button>
                    </div>
                )

            )}
            {googleSignIn &&

                <div>
                    <div className="signed-in-google-text">
                        <p>Linked to Google account:</p>
                    </div>
                    <GoogleButton id="google-button" label={email} />
                    {googleSignIn && !noPassword &&
                        <button
                            className="unlink-google"
                            onClick={() => setShowUnlinkMessage(true)}
                        >(Unlink Google account)
                        </button>}
                </div>}
                {showUnlinkMessage && 
                 <div className='overlay unlink-message' ref={overlayRef}>
                    <UnlinkMessage 
                        setShowUnlinkMessage={setShowUnlinkMessage}
                        setGoogleSignIn={setGoogleSignIn}
                    />
                 </div>
                }
        </Card>
    )
}