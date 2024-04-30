const db = require('../config/db');

const coinsCreate = async (id) => {
    const query = 'INSERT INTO coins (user_id, total_coins) VALUES ($1, $2)';
    try {
        const result = await db.query(query, [id, 0]);
        return result;
    } catch (error) {
        throw error;
    }
}

const coinsGet = async (id) => {
    const query = 'SELECT total_coins FROM coins WHERE user_id = $1';
    try {
        const result = await db.query(query, [id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const coinsAdd = async (coins, id) => {
    const query = 'UPDATE coins SET total_coins = total_coins + $1 WHERE user_id = $2';
    try {
        const result = await db.query(query, [coins, id]);
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const coinsSubtract = async (coins, id) => {
    const query = 'UPDATE coins SET total_coins = total_coins - $1 WHERE user_id = $2';
    try {
        const result = await db.query(query, [coins, id]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    coinsCreate,
    coinsGet,
    coinsAdd,
    coinsSubtract
}