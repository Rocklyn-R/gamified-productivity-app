import React from "react";
import Card from "../../../components/Card/Card";
import { unlinkUserFromGoogle } from "../../../api/profile";

interface UnlinkMessageProps {
    setShowUnlinkMessage: (arg0: boolean) => void;
    setGoogleSignIn: (arg0: boolean) => void;
}


export const UnlinkMessage: React.FC<UnlinkMessageProps> = ({ setShowUnlinkMessage, setGoogleSignIn }) => {
   
    const handleUnlinkUser = async () => {
        await unlinkUserFromGoogle();
        setGoogleSignIn(false);
        setShowUnlinkMessage(false);
    }
    
    return (
        <Card className="delete-message-container" >
            <h4>Unlink From Google Account</h4>
            <p>Do you really wish to unlink your account from Google?</p>
            <button className="command-button"
                onClick={() => setShowUnlinkMessage(false)}
            >
                Cancel
            </button>
            <button
                className="command-button"
                onClick={handleUnlinkUser}
            >
                Yes
            </button>
        </Card>
    )
}