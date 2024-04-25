const { createUser, findUserById } = require('../models/user');
const passport = require('../config/passport');

const createUserController = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const newUser = await createUser(first_name, last_name, email, password);
        req.login(newUser, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({ message: 'Failed to log in user' })
            } else {
                res.status(201).send();
            }
        })
        //res.status(201).send();
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

const getUserData = (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    res.status(200).json(user);
}



module.exports = { createUserController, getUserData };