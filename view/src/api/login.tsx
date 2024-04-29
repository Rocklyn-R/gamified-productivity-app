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
        credentials: 'include'
    });
    return response;
}

export const checkAuthentication = async () => {
    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (response.status === 401) {
            return false;
        } else return true;

    } catch (error: any) {
        console.error('Error checking authentication:', error.message);
    }
}

/*export const checkAuthorization = async (routePath: string) => {
    try {
        const response = await fetch(`http://localhost:4000/${routePath}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (response.status === 401) {
            return false;
        } else return true;
    } catch (error) {
        console.error('Error checking Authorization:', error);
        return false;
    }
}*/