import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { createNewPassword } from "../../../api/profile";

interface CreatePasswordFormProps {
    setCreatePassword: (arg0: boolean) => void;
    setNoPassword: (arg0: boolean) => void;
}

export const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({ setCreatePassword, setNoPassword }) => {
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleToggleRepeatVisibility = () => {
        setShowPasswordRepeat(!showPasswordRepeat);
    }

    const handleSubmitCreatePassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== passwordRepeat) {
            setErrorMessage("Passwords don't match. Try again.")
        } else {
            await createNewPassword(password);
            setCreatePassword(false);
            setNoPassword(false);
        }
    }

    return (
        <>
            <form className="create-password-form" onSubmit={handleSubmitCreatePassword}>
                <div className="input-button-container">
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        label="Password" // MUI TextField uses a label prop instead of placeholder for floating label text
                        variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{
                            width: '150px', marginRight: '10px',
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
                    <TextField
                        type={showPasswordRepeat ? 'text' : 'password'}
                        label="Repeat" // MUI TextField uses a label prop instead of placeholder for floating label text
                        variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                        onChange={(e) => setPasswordRepeat(e.target.value)}
                        required
                        sx={{
                            width: '150px', marginRight: '10px',
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleRepeatVisibility} edge='end'>
                                        {showPasswordRepeat ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            autoComplete: 'off', // More specific to potentially improve browser compliance
                        }}
                    />
                    <button type="submit"><FaCheck /></button>
                    <button type="button" onClick={() => { setCreatePassword(false) }}><FaXmark /></button>
                </div>
                {errorMessage &&
                    <div>
                        <p id="error-message">Passwords don't match. Try again.</p>
                    </div>}

            </form>
        </>
    )
}