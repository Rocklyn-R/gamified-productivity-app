export const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://task-master-backend-m9mq.onrender.com'
    : 'http://localhost:4000';

export const getCoins = async () => {
    try {
        const response = await fetch(`${BASE_URL}/coins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const data = await response.json();
        return data.totalCoins[0].total_coins;
    } catch (error) {
        console.log(error);
    }
};

export const subtractCoins = async (coins: number) => {
    try {
        const response = await fetch(`${BASE_URL}/coins/subtract-coins`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ coins })
        })
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }
};

export const addCoins = async (coins: number) => {
    try {
        const response = await fetch(`${BASE_URL}/coins/add-coins`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ coins })
        })
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }
}