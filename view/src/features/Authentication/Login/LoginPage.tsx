import React, { useState } from 'react';
import "./LoginPage.css";
import Card from '../../../components/Card/Card';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { logInUser } from '../../../api/login';
import { authenticateUser } from '../../../store/UserSlice';
import { useDispatch } from 'react-redux';
import GoogleButton from 'react-google-button';
import { BASE_URL } from '../../../api/coins';


export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }



    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Make a POST request to your server's signup endpoint using fetch
            const response = await logInUser(username, password);
            console.log(response);
            if (response === 'Incorrect email or password') {
                setErrorMessage('Incorrect email or password. Try again.');
                setUsername('');
                setPassword('');
                return;
            } else {
                setErrorMessage('');
                dispatch(authenticateUser());
                navigate('/tasks');
            }

            // Redirect to '/tasks' route after successful signup

        } catch (error: any) {
            console.error('Error signing up:', error.message);
            // Handle error (e.g., display error message to user)
        }
    }

    const handleGoogleSignIn = async () => {
        const googleLoginURL = `${BASE_URL}/login/auth/google`;
        //const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600");
        window.location.href = googleLoginURL;
    }

    return (
        <Card className="log-in-container">
            <h1>Welcome to Task Master</h1>
            <h1>Sign In</h1>
            <form className='log-in-form' onSubmit={handleSubmitLogin}>
                <TextField
                    name="username"
                    type="text"
                    label="Email" // MUI TextField uses a label prop instead of placeholder for floating label text
                    variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
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
                    name="password"
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
                                <IconButton onClick={handleTogglePasswordVisibility} edge='end'>
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        autoComplete: 'off', // More specific to potentially improve browser compliance
                    }}
                />

                <button type="submit" className='command-button'>Log in</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <h4>or</h4>
            <div className='alternate-login'>
                 <GoogleButton onClick={() => handleGoogleSignIn()} />
            </div>
            <Link to="/signup" className='sign-up-link-text-2'><h2>Sign up</h2></Link>
        </Card>

    )
}