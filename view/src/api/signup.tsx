export const createNewUser = async (name: string, lastName: string, email: string, password: string) => {
    // Make a POST request to your server's signup endpoint using fetch
    try {
        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: name,
                last_name: lastName,
                email: email.toLowerCase(),
                password,
            }),
            credentials: 'include'
        });
        if (response.ok) {
            return 'Success';
        } else {
            const data = await response.json();
            if (data && data.message === 'Failed to create user') {
                return 'User with this email already exists';
            } else {
                return 'An error occurred';
            }
        }
    } catch (error) {
        return 'An error occurred';
    }
};

