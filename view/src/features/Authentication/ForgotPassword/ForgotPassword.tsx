import Card from "../../../components/Card/Card";
import { TextField } from "@mui/material";
import { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { checkForUserEmail, sendResetEmail } from "../../../api/login";
import e from "express";
import { Loading } from "../../../components/Loading/Loading";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [pending, setPending] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const handleSubmitEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPending(true);
        setErrorMessage("");
        const emailCheckResult = await checkForUserEmail(email);
        if (emailCheckResult === "User not found") {
            setErrorMessage("No account associated with that email. Please try again.");
            setPending(false);
        }
        if (emailCheckResult === "User found") {
            console.log(emailCheckResult);
            await sendResetEmail(email);
            setPending(false);
            setSuccessMessage(true)
        }
    }

    return (
        <Card className="reset-container">
            <h1>Reset Password</h1>
            {successMessage ? <div className='reset-password-container'>
                <p className="reset-text email-text">{email}</p>
            </div> : (
                <form className='reset-password-form' onSubmit={handleSubmitEmail}>
                    <p className="reset-text">Please enter your email address.</p>
                    <TextField
                        name="email"
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
                    {pending ? <Loading /> : <button type="submit" className='command-button'>Submit</button>}

                </form>

            )}


            {errorMessage && <p className="error-message-reset">{errorMessage}</p>}
            {successMessage && <p>An email has been sent with a link to reset your password.</p>}
            <Link to="/login" className='sign-up-link-text-2'><h2>Log In</h2></Link>

            <Link to="/signup" className='sign-up-link-text-2'><h2>Sign Up</h2></Link>
        </Card>
    )
}