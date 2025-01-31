import { BASE_URL } from "./coins";


export const logInUser = async (username: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
            credentials: 'include'
        });

        // Check if the response is OK (status 200)
        if (response.ok) {
            return true; // Successful login
        } else {
            // If the response is not OK, return the error message
            const responseData = await response.json();
            return responseData.message || "Incorrect email or password"; // Default to error message if none is provided
        }
    } catch (error) {
        console.error('Error during login:', error);
        return "Incorrect email or password"; // Handle any other error
    } 
}

export const checkAuthentication = async () => {
    try {
        console.log(BASE_URL);
        const response = await fetch(`${BASE_URL}/auth`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        if (response.status === 401) {
            return false;
        } else if (response.status === 200 && data.message === 'User not signed in') {
            return false;
        } else return true;

    } catch (error: any) {
        console.error('Error checking authentication:', error.message);
    }
}

export const googleSignIn = async () => {
    try {
        const response = await fetch(`${BASE_URL}/login/auth/google`);
        console.log(response);
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.error(error);
    }
}

export const checkForUserEmail = async (email: string) => {
    try {
        const response = await fetch(`${BASE_URL}/login/reset-password/email-check?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(error);
    }
}

export const sendResetEmail = async (email: string) => {
    try {
    const response = await fetch(`${BASE_URL}/login/send-reset-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    if (response.ok) {
        return true;
    }
    } catch (error) {
        console.error(error)
    }
};

export const createNewPasswordWithToken = async (password: string, user_id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/login/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, user_id }),
        });
        if (response.ok) {
            return true;
        }
        } catch (error) {
            console.error(error)
        }
}

export const checkToken = async (token: string) => {
    try {
        const response = await fetch(`${BASE_URL}/login/reset-password/check-token?token=${token}`);
        const data = await response.json();
        console.log(data);
        return data;
        } catch (error) {
            console.error(error)
        }
}