const db = require('../config/db');

const tasksGet = async (id) => {
    const query = 'SELECT id, name, notes, coin_reward, deadline, coin_penalty, completion_status, overdue FROM task WHERE user_id = $1 and completion_status = $2';
    try {
        const result = await db.query(query, [id, 'pending']);
        return result.rows;
    } catch (error) {
        throw (error);
    }
}


const taskCreateNew = async (id, user_id, name, notes, coin_reward, deadline, coin_penalty, overdue) => {
    const query = 
    'INSERT INTO task (id, user_id, name, notes, coin_reward, deadline, coin_penalty, overdue) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    try {
       const result = await db.query(query, [id, user_id, name, notes, coin_reward, deadline, coin_penalty, overdue]);
       return result;
    } catch (error) {
        throw (error);
    }
}

const taskUpdateOverdue = async (id) => {
    const query = 'UPDATE task SET overdue = $1 WHERE id = $2';
    try {
        const result = await db.query(query, [true, id]);
        return result;
    } catch (error) {
        throw (error);
    }
}

const taskChangeCompletionStatus = async (completion_status, id) => {
    const query = 'UPDATE task SET completion_status = $1, overdue = $2 WHERE id = $3';
    try {
        const result = await db.query(query, [completion_status, false, id]);
        return result;
    } catch (error) {
        throw (error);
    }
};

const tasksHistoryGet = async (user_id) => {
    const query = 'SELECT id, name, notes, coin_reward, deadline, coin_penalty, completion_status, overdue FROM task where user_id = $1 and completion_status IN ($2, $3)';
    try {
        const result = await db.query(query, [user_id, 'incomplete', 'completed']);
        return result.rows;
    } catch (error) {
        throw (error);
    }
}





module.exports = {
    taskCreateNew,
    tasksGet,
    tasksHistoryGet,
    taskUpdateOverdue,
    taskChangeCompletionStatus
}