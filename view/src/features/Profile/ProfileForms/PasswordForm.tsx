import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

interface PasswordFormProps {
    setEditPassword: (arg0: boolean) => void;
}


export const PasswordForm: React.FC<PasswordFormProps> = ({setEditPassword}) => {

    const [oldPassword, setOldPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPasword, setNewPassword] = useState('');

    const handleTogglePasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    const handleToggleNewPasswordVisibility = () => {
        setShowNewPassword(!setShowNewPassword);
    }


    return (
        <>
            <form>
                <TextField
                    type={showCurrentPassword ? 'text' : 'password'}
                    label="Current" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
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
                                    {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />
                <TextField
                    type={showNewPassword ? 'text' : 'password'}
                    label="New" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={oldPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                                <IconButton onClick={handleToggleNewPasswordVisibility} edge='end'>
                                    {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />
                <button type="submit"><FaCheck /></button>
                <button type="button" onClick={() => { setEditPassword(false) }}><FaXmark /></button>
            </form>
        </>
    )
}