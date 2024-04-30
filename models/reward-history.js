const db = require('../config/db');

const rewardHistoryAdd = async (user_id, id, shop_item_id, date_used) => {
    const query = 'INSERT INTO reward_history (id, user_id, shop_item_id, date_used) VALUES ($1, $2, $3, $4)';
    try {
        const result = await db.query(query, [id, user_id, shop_item_id, date_used]);
        if (result) {
            return result;
        }
    } catch (error) {
        throw error;
    }
}

const rewardHistoryGet = async (id) => {
    const query = `
    SELECT
    shop.name AS name,
    shop.price AS price,
    shop.description AS description,
    reward_history.id AS id,
    shop.icon AS icon,
    reward_history.date_used AS date_used
    FROM
    reward_history
    JOIN
    shop ON reward_history.shop_item_id = shop.id
    WHERE
    shop.user_id = $1;`
    try {
        const result = await db.query(query, [id]);
        if (result) {
            return result.rows;
        }
    } catch (error) {
        throw error;
    }
};

const rewardHistoryItemDelete = async (id) => {
    const query = 'DELETE FROM reward_history WHERE id = $1';
    try {
        const result = await db.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    rewardHistoryAdd,
    rewardHistoryGet,
    rewardHistoryItemDelete
}