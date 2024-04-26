const db = require('../config/db');

const tasksGet = async (id) => {
    const query = 'SELECT id, name, notes, coin_reward, deadline, coin_penalty, overdue FROM task WHERE user_id = $1';
    try {
        const result = await db.query(query, [id]);
        return result.rows;
    } catch (error) {
        throw (error);
    }
}

const taskCreateNew = async (id, user_id, name, notes, coin_reward, deadline, coin_penalty, overdue) => {
    const query = 
    'INSERT INTO task (id, user_id, name, notes, coin_reward, deadline, coin_penalty, overdue) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    try {
       const result = db.query(query, [id, user_id, name, notes, coin_reward, deadline, coin_penalty, overdue]);
       return result;
    } catch (error) {
        throw (error);
    }
}

module.exports = {
    taskCreateNew,
    tasksGet
}