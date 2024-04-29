export const getShopItems = async () => {
    try {
        const response = await fetch('http://localhost:4000/shop-rewards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const data = await response.json();

        if (response.ok) {
           return data.shopItems;
        } else return [];

    } catch (error) {
        throw error;
    }
}

export const createShopItem = async (
    id: string,
    name: string,
    description: string,
    price: number,
    icon: string
) => {
    try {
        const response = await fetch('http://localhost:4000/shop-rewards/create-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id, name, description, price, icon })
        })

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const updateShopItem = async (
    id: string,
    name: string, 
    description: string, 
    price: number, 
    icon: string
) => {
    try {
        const response = await fetch('http://localhost:4000/shop-rewards/edit-item', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id, name, description, price, icon })
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

export const deleteShopItem = async (id: string) => {
    try {
        const response = await fetch('http://localhost:4000/shop-rewards/delete-item', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id })
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

export const purchaseShopItem = async (
    id: string, 
    shop_item_id: string, 
    quantity: number
    ) => {
    try {
        const response = await fetch('http://localhost:4000/shop-rewards/buy-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id, shop_item_id, quantity })
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