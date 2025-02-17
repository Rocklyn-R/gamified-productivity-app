import React, { useState } from "react";
import './SignupPage.css';
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Card from "../../../components/Card/Card";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from "react-router-dom";
import { createNewUser } from "../../../api/signup";
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from "../../../store/UserSlice";
import { useDispatch } from "react-redux";
import { createPomodoro } from "../../../api/pomodoro";
import { v4 as uuidv4 } from "uuid";
import GoogleButton from 'react-google-button'
import { BASE_URL } from "../../../api/coins";
import { Loading } from "../../../components/Loading/Loading";

export const SignUp = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pending, setPending] = useState(false);


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        try {
            const response = await createNewUser(name, lastName, email, password);
            if (response === 'User with this email already exists') {
                setErrorMessage("User with this email already exists. Try a different email");
                setPending(false);
            } else if (response === 'Success') {
                dispatch(authenticateUser());
                const pomodoroId = uuidv4();
                await createPomodoro(pomodoroId);
                setErrorMessage("");
                setPending(false)
                navigate('/tasks');
            } else {
                setErrorMessage('Failed to sign up');
                setPending(false);
            }
        } catch (error: any) {
            setPending(false)
            setErrorMessage("Failed to sign up")
        }
    };

    const handleGoogleSignIn = async () => {
        const googleLoginURL = `${BASE_URL}/login/auth/google`;
        //const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600");
        window.location.href = googleLoginURL;
    }


    return (
        <Card className="sign-up-container">
            <h1>Sign Up</h1>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    label="First name" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />
                <TextField
                    type="text"
                    label="Last name" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    fullWidth
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />
                <TextField
                    type="text"
                    label="Email" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
                    }}
                    InputProps={{
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    label="Password" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    sx={{
                        width: '100%',
                        marginTop: "1rem",
                        marginBottom: '20px',
                        color: "#0c3d63" // Using the sx prop to apply margin
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
                {pending ? <Loading /> : <button type="submit" className='command-button'>Sign Up</button>}
                
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <h4>or</h4>
            <Link to="/login" className='sign-up-link-text'><h2>Log in</h2></Link>
            <div className='alternate-login'>
                <GoogleButton onClick={() => handleGoogleSignIn()} />
            </div>
        </Card>

    )
}