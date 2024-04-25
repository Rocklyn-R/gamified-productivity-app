export const logoutUser = async () => {
    try {
        const response = await fetch('http://localhost:4000/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        return response.status
    } catch (error) {
        console.error('Error logging out:', error);
    }
}