import {BASE_URL} from "./coins";

export const getUserDetails = async () => {
    try {
        const response = await fetch(`${BASE_URL}/profile`, {
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
        const response = await fetch(`${BASE_URL}/profile/updateUsername`, {
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
        const response = await fetch(`${BASE_URL}/profile/updateEmail`, {
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

export const updateUserPassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await fetch(`${BASE_URL}/profile/changePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ oldPassword, newPassword })
        })

        const data = await response.json();
        console.log(data.message);

        if (response.ok) {
            //console.log('Success');
            return 'Success';
        } else if (!response.ok && data.message === 'Old password incorrect') {
            return 'Old password incorrect';
        } else {
            throw new Error('Failed to update user email')
        }
    } catch (error) {
        console.log(error)
    }
}

export const createNewPassword = async (password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/profile/create-new-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ password })
        })

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    } 
}

export const unlinkUserFromGoogle = async () => {
    try {
        const response = await fetch(`${BASE_URL}/profile/unlink-from-google`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteUserAccount = async (password: string) => {
    try {
        const response = await fetch(`${BASE_URL}/profile/delete-account`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ password })
        })
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            return true;
        } else {
            const errorData = await response.json(); // Parse error response body as JSON
            console.error(errorData); // Log error message
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}