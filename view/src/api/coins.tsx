export const getCoins = async () => {
    try {
        const response = await fetch('http://localhost:4000/coins', {
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
        const response = await fetch('http://localhost:4000/coins/subtract-coins', {
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
        console.log(JSON.stringify({ coins: coins }))
        const response = await fetch('http://localhost:4000/coins/add-coins', {
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