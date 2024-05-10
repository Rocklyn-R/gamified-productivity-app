const db = require('../config/db');

const itemPurchase = async (id, user_id, shop_item_id, quantity) => {
    const inventoryCheckQuery = 'SELECT 1 FROM inventory WHERE shop_item_id = $1';
    try {
        const inventoryCheckResult = await db.query(inventoryCheckQuery, [shop_item_id]);
        if (inventoryCheckResult.rows.length === 0) {
            const insertQuery = 'INSERT INTO inventory (id, user_id, shop_item_id, quantity) VALUES ($1, $2, $3, $4)';
            const insertResult = await db.query(insertQuery, [id, user_id, shop_item_id, quantity]);
            return insertResult;
        } else if (inventoryCheckResult.rows.length > 0) {
            const updateQuantityQuery = 'UPDATE inventory SET quantity = quantity + $1 WHERE shop_item_id = $2';
            const updateQuantityResult = await db.query(updateQuantityQuery, [quantity, shop_item_id]);
            return updateQuantityResult;
        }
    } catch (error) {
        throw (error);
    }
}

const inventoryItemsGet = async (id) => {
    const query = `
    SELECT shop.name AS name, 
           shop.description AS description, 
           inventory.shop_item_id AS id, 
           shop.icon AS icon, 
           inventory.quantity AS quantity
    FROM inventory
    JOIN shop ON inventory.shop_item_id = shop.id
    WHERE inventory.user_id = $1
    ORDER BY inventory.date_modified DESC;
`;
    try {
        const result = await db.query(query, [id]);
        return result.rows;
    } catch (error) {
        throw (error);
    }
};

const inventoryItemUse = async (id, quantity) => {
    const selectQuery = 'SELECT quantity FROM inventory WHERE shop_item_id = $1';
    const updateQuery = 'UPDATE inventory SET quantity = quantity - $1 WHERE shop_item_id = $2';
    const deleteQuery = 'DELETE FROM inventory WHERE shop_item_id = $1';
    try {
        const quantityResult = await db.query(selectQuery, [id]);
        if (quantityResult.rows[0].quantity > 1) {
            const updateResult = await db.query(updateQuery, [quantity, id]);
            return updateResult;
        } else {
            const deleteResult = await db.query(deleteQuery, [id]);
            return deleteResult;
        }
    } catch (error) {
        throw error;
    }
}


module.exports = {
    itemPurchase,
    inventoryItemsGet,
    inventoryItemUse
}