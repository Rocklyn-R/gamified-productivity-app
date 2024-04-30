const db = require('../config/db');

const shopItemsGet = async (id) => {
    const query = 'SELECT name, price, description, id, icon FROM shop WHERE user_id = $1 AND deleted = $2 ORDER BY date_created DESC';
    try {
        const result = await db.query(query, [id, false]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

const shopItemCreate = async (id, user_id, name, description, price, icon) => {
    const query = 'INSERT INTO shop (id, user_id, name, description, price, icon) VALUES ($1, $2, $3, $4, $5, $6)';
    try {
        const result = await db.query(query, [id, user_id, name, description, price, icon]);
        return result;
    } catch (error) {
        throw (error);
    }
}

const shopItemEdit = async (id, name, description, price, icon) => {
    const query = 'UPDATE shop SET name = $1, description = $2, price = $3, icon = $4 WHERE id = $5';
    try {
        const result = await db.query(query, [name, description, price, icon, id]);
        return result;
    } catch (error) {
        throw (error);
    }
}

const shopItemDelete = async (id) => {
    const inventoryCheckQuery = 'SELECT 1 FROM inventory WHERE shop_item_id = $1';
    const rewardHistoryCheckQuery = 'SELECT 1 FROM reward_history WHERE shop_item_id = $1';
    try {
        const inventoryCheckResult = await db.query(inventoryCheckQuery, [id]);
        const rewardHistoryCheckResult = await db.query(rewardHistoryCheckQuery, [id]);
        if (inventoryCheckResult.rows.length === 0 && rewardHistoryCheckResult.rows.length === 0) {
            const deleteQuery = 'DELETE FROM shop WHERE id = $1';
            const deleteResult = await db.query(deleteQuery, [id]);
            return deleteResult;
        } else if (inventoryCheckResult.rows.length > 0 || rewardHistoryCheckResult.rows.length > 0) {
            const updateQuery = 'UPDATE shop SET deleted = $1 WHERE id = $2'
            const updateResult = await db.query(updateQuery, [true, id]);
            return updateResult;
        } else return undefined;
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    shopItemsGet,
    shopItemCreate,
    shopItemEdit,
    shopItemDelete
}