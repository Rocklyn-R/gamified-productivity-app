import { BASE_URL } from "./coins";

export const logoutUser = async () => {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        return response.status;
    } catch (error) {
        console.error('Error logging out:', error);
    }
}