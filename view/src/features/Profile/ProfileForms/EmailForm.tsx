import { TextField } from "@mui/material"
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { updateUserEmail } from "../../../api/profile";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../store/UserSlice";

interface EmailProps {
    emailLocal: string,
    setEmailLocal: (arg0: string) => void;
    setEditEmail: (arg0: boolean) => void;
}


export const EmailForm: React.FC<EmailProps> = ({ emailLocal, setEmailLocal, setEditEmail }) => {
    const dispatch = useDispatch();


    const handleUpdateEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updateEmail = await updateUserEmail(emailLocal);
        if (updateEmail) {
            dispatch(setEmail(emailLocal));
        }
        setEditEmail(false);
    }

    return (
        <>
            <form onSubmit={handleUpdateEmail} className='account-form-1 version-2'>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={emailLocal}
                    onChange={(e) => setEmailLocal(e.target.value)}
                    fullWidth
                    sx={{
                        width: '100%', marginRight: '10px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'aliceblue', // Outline color
                            },
                            '&:hover fieldset': {
                                borderColor: 'aliceblue', // Outline color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'aliceblue', // Outline color on focus
                            },

                        },
                        '& .MuiInputLabel-root': {
                            color: 'aliceblue', // Label color
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'aliceblue', // Label color on focus
                        },
                        '& .MuiInputBase-input': {
                            color: 'aliceblue', // Text color
                        },
                        '& .MuiInputBase-input:focus': {
                            color: 'aliceblue', // Text color on focus
                        },
                    }}
                />
                <div className="account-form-buttons">
                    <button type="submit"><FaCheck /></button>
                    <button type="button" onClick={() => setEditEmail(false)}><FaXmark /></button>
                </div>
            </form>
        </>
    )
}