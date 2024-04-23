const db = require('../config/db');

const createUser = (first_name, last_name, email, password) => {
    return new Promise((resolve, reject) => {
       db.query('INSERT INTO app_user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, email, password], (error, results) => {
        if (error) {
            console.log('Error executing query:', error);
            reject(error);
        } else {
            resolve(results.rows[0]);
        }
    }) 
    })
    
}

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM app_user WHERE email = $1';
    try {
       const result = await db.query(query, [email]);
    return result.rows[0]; 
    } catch (error) {
        throw error;
    }
};

const findUserById = async (id) => {
    const query = 'SELECT * FROM app_user where id = $1';
    try {
        const result = await db.query(query, [id]);
        return result.rows[0]
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, findUserByEmail, findUserById }