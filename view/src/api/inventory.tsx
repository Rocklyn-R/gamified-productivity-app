import { BASE_URL } from "./coins";


export const getInventoryItems = async () => {
    try {
        const response = await fetch(`${BASE_URL}/inventory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const data = await response.json();

        if (response.ok) {
           return data.inventoryItems;
        } else return [];

    } catch (error) {
        throw error;
    }
}

export const spendInventoryItem = async (id: string, quantity: number) => {
    try {
        const response = await fetch(`${BASE_URL}/inventory/use-item`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id, quantity })
        })
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

export const addToRewardHistory = async (id: string, shop_item_id: string, date_used: string) => {
    try {
        const response = await fetch(`${BASE_URL}/inventory/add-to-history`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id, shop_item_id, date_used })
        })
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

export const getRewardHistory = async () => {
    try {
        const response = await fetch(`${BASE_URL}/inventory/reward-history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await response.json();

        if (response.ok) {
            const reversedData = data.rewardHistory.reverse();
            return reversedData
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
}

export const deleteFromRewardHistory = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/inventory/reward-history/delete-item`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id })
        })


        if (response.ok) {
            return true;
        } else {
            return false
        }
    } catch (error) {
        throw error;
    }
}