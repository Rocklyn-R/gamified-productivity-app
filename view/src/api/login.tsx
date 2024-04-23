export const logInUser = async (email: string, password: string) => {
    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    return response;
}

export const checkUserAuthentication = async () => {
    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (response.status === 302 && response.redirected) {
            return true;
        } else if (response.ok) {
            return false;
        } else {
            throw new Error('Failed to check authentication status')
        }

    } catch (error: any) {
        console.error('Error checking authentication:', error.message);
    }
}