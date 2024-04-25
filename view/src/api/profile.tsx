export const getUserDetails = async () => {
    try {
        const response = await fetch('http://localhost:4000/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error);
    }
};

export const updateUserName = async (firstName: string, lastName: string) => {
    try {
        const response = await fetch('http://localhost:4000/profile/updateUsername', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ firstName, lastName })
        })

        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to update username')
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateUserEmail = async (email: string) => {
    try {
        const response = await fetch('http://localhost:4000/profile/updateEmail', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email })
        })

        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to update user email')
        }
    } catch (error) {
        console.log(error);
    }
}