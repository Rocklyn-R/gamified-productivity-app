import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Card from "../../../../components/Card/Card"
import './DeleteAccount.css';
import { deleteUserAccount } from "../../../../api/profile";
import { Navigate, useNavigate } from "react-router-dom";

interface DeleteAccountProps {
    setDeleteAccount: (arg0: boolean) => void;
}

export const DeleteAccount: React.FC<DeleteAccountProps> = ({ setDeleteAccount }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState("");
    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmitDeleteAccount = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const deletion = await deleteUserAccount(password);
        if (!deletion) {
            setErrorPassword("Incorrect password")
        } else {
            navigate('/login')
        }
    }

    return (
        <Card className='delete-account-box'>
            <h4>Delete Account</h4>
            <p>To delete your account please enter your password:</p>
            <form onSubmit={handleSubmitDeleteAccount}>
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    required
                    sx={{
                        width: '15rem',
                        marginTop: "1rem",
                        marginBottom: '1rem',
                        '& .MuiInputLabel-root': {
                            color: '#0c3d63', // Default label color
                            '&.Mui-focused': {
                                color: '#0c3d63', // Label color when focused
                            },
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-root.Mui-focused': {
                            '& fieldset': {
                                borderColor: '#0c3d63',
                            }
                        },
                        '& .MuiOutlinedInput-input': {
                            color: '#0c3d63',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />
                 {errorPassword && <p id="password-incorrect-error">Password incorrect!</p>}
                <div className="delete-cancel-container">
                    <button
                        className="command-button"
                        type="button"
                        onClick={() => setDeleteAccount(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="command-button"
                        type="submit"
                    >
                        Delete Account
                    </button>
                </div>
            </form>

        </Card>
    )
}