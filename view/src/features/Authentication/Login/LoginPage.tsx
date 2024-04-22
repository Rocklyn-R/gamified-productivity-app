import React, {useState} from 'react';
import "./LoginPage.css";
import Card from '../../../components/Card/Card';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export const LoginPage = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ errorMessage, setErrorMessage ] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }


    const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Make a POST request to your server's signup endpoint using fetch
            const response = await fetch('http://localhost:4001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                setErrorMessage('Incorrect email or password. Try again.');
                setEmail('');
                setPassword('');
            } else { setErrorMessage('')}

            // Redirect to '/tasks' route after successful signup
            
        } catch (error: any) {
            console.error('Error signing up:', error.message);
            // Handle error (e.g., display error message to user)
        }
    }

    return (
        <Card className="log-in-container">
            <h1>Log In</h1>
            <form className='log-in-form' onSubmit={handleSubmitLogin}>
                <TextField 
                   type="text"
                   label="Email" // MUI TextField uses a label prop instead of placeholder for floating label text
                   variant="outlined" // You can choose "filled" or "standard" as well, depending on your design preference
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
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
            <Link to="/signup" className='sign-up-link-text'><h2>Sign up</h2></Link>
        </Card>

    )
}