const db = require('../config/db');
const { coinsCreate } = require('../models/coins');
const { pomodoroCreate } = require('./pomodoro');
const { v4: uuidv4 } = require('uuid');


const findByGoogleIdOrCreate = async (profile) => {
    const google_id = profile.id;
    const email = profile.emails[0].value;
    const first_name = profile.name.givenName;
    const last_name = profile.name.familyName;

    const findExistingGoogleIdQuery = `SELECT * FROM app_user WHERE google_id = $1`
    const findExistingEmail = `SELECT * FROM app_user WHERE email = $1`
    try {
        const findUserByGoogleIdResult = await db.query(findExistingGoogleIdQuery, [google_id]);
        if (findUserByGoogleIdResult.rows.length === 0) {
            const findExistingEmailResult = await db.query(findExistingEmail, [email]);
            if (findExistingEmailResult.rows.length === 0) {
                const createQuery = `INSERT INTO app_user
            (first_name, last_name, email, google_id)
            VALUES ($1, $2, $3, $4) RETURNING *`
                const newUser = await db.query(createQuery, [first_name, last_name, email, google_id]);
                const newUserId = newUser.rows[0].id;
                await coinsCreate(newUserId);
                const pomodoroId = uuidv4();
                await pomodoroCreate(pomodoroId, newUserId)
                return newUser.rows[0];
            } else {
                const updateUserQuery = `UPDATE app_user
                SET google_id = $1 WHERE email = $2 RETURNING *`
                const updateUser = await db.query(updateUserQuery, [google_id, email])
                return updateUser.rows[0]
            }
        } else {
            return findUserByGoogleIdResult.rows[0];
        }
    } catch (error) {
        throw error;
    }
}

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
};

const userUpdateName = async (id, firstName, lastName) => {
    const query = 'UPDATE app_user SET first_name = $1, last_name = $2 WHERE id = $3';
    try {
        const result = await db.query(query, [firstName, lastName, id]);
        return result;
    } catch (error) {
        console.log('Error updating user:', error);
        throw error;
    }
}

const userUpdateEmail = async (id, email) => {
    const query = 'UPDATE app_user SET email = $1 where id = $2';
    try {
        const result = await db.query(query, [email, id]);
        return result;
    } catch (error) {
        throw error;
    }
}

const userUpdatePassword = async (id, newPassword) => {
    const query = 'UPDATE app_user SET password = $1 where id = $2';
    try {
        const result = await db.query(query, [newPassword, id]);
        console.log(`User with ID ${id} updated password successfully`);
        return result;
    } catch (error) {
        throw error;
    }
}

const userUnlinkFromGoogle = async (id) => {
    const query = 'UPDATE app_user SET google_id = $1 WHERE id = $2';
    try {
        const result = await db.query(query, [null, id]);
        return result;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    userUpdateName,
    userUpdateEmail,
    userUpdatePassword,
    findByGoogleIdOrCreate,
    userUnlinkFromGoogle
}