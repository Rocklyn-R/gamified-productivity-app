export const getInventoryItems = async () => {
    try {
        const response = await fetch('http://localhost:4000/inventory', {
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