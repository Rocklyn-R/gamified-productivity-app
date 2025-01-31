import Card from "../../../components/Card/Card"
import "./ResetPassword.css";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { Loading } from "../../../components/Loading/Loading";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from "react-router-dom";
import { checkToken, createNewPasswordWithToken } from "../../../api/login";


export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [pending, setPending] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [userId, setUserId] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        // Call backend to verify the token
        const validateToken = async () => {
            try {
                if (token) {
                    console.log(token)
                    const response = await checkToken(token);
                    if (response.valid) {
                        setIsValid(true);  // Token is valid, show form
                        setUserId(response.user_id)
                    } else {
                        setIsValid(false);
                        if (response.message === "Token expired") {
                            setError(response.message);
                        } else {
                            setError(response.message)
                        }
                    }
                }
            } catch (error) {
                setError('Error verifying token');
            }
        };

        validateToken();
    }, [token]);

    const submitNewPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        setErrorMessage("");
        if (password !== passwordRepeat) {
            setErrorMessage("Passwords don't match. Try again.")
            setPending(false);
        } else {
            if (userId) {
                const passwordUpdate = await createNewPasswordWithToken(password, userId);
                if (passwordUpdate) {
                    setSuccessMessage(true);
                }
                setPending(false);
            }
        }
    }

    const handleTogglePasswordVisibility = (passType: string) => {
        if (passType == "password") {
            setShowPassword(!showPassword);
        }
        if (passType === "password-repeat") {
            setShowPasswordRepeat(!showPasswordRepeat);
        }
    }
    if (isValid === null) {
        return (
            <Loading />
        )
    }

    if (isValid === false && error === "Token expired") {
        return (
            <Card className="reset-container">
                <h1>Reset Password</h1>
                <p>This link has expired.</p>
                <button onClick={() => navigate('/reset-password')} className="command-button">Get new reset password link</button>
            </Card>
        )
    }
    if (isValid === false && error === "Token not found") {
        return (
            <Card className="reset-container">
                <p>This page does not exist.</p>
                <button onClick={() => navigate('/reset-password')} className="command-button">Back to reset password</button>
            </Card>
        )
    }

    return (
        <Card className="reset-container">
            <h1>Reset Password</h1>
            {successMessage ? (
                <div className='reset-password-container'>
                    <p className="reset-text">Password successfully updated! Log in with your new password.</p>
                    <button className="command-button" onClick={() => navigate('/tasks')}>Go to Login Page</button>
                </div>
            ) : <form className="reset-form" onSubmit={submitNewPassword}>
                <p className="reset-text">Please create your new password.</p>
                <TextField
                    name="Password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleTogglePasswordVisibility('password')} edge='end'>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}

                />
                <TextField
                    name="Repeat-Password"
                    type={showPasswordRepeat ? 'text' : 'password'}
                    label="Repeat password" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    required
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleTogglePasswordVisibility('password-repeat')} edge='end'>
                                    {showPasswordRepeat ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />
                {errorMessage && <p className="reset-text error-text">{errorMessage}</p>}
                {pending ? <Loading /> : <button type="submit" className='command-button'>Change Password</button>}
            </form>}


        </Card>
    )
}