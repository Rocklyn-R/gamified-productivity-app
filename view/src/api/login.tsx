import { BASE_URL } from "./coins";


export const logInUser = async (email: string, password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
        credentials: 'include'
    });
    const responseData = await response.json();
    console.log(responseData)
        if (!response.ok) {
            return "Incorrect email or password"
        }
        return true;
    } catch (error) {
        return "Incorrect email or password";
    } 
}

export const checkAuthentication = async () => {
    try {
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