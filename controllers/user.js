const { createUser } = require('../models/user');

const createUserController = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const newUser = await createUser(first_name, last_name, email, password);
        res.redirect('/tasks');
        //res.status(201).json({ message: 'User created successfully', user: newUser});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message});
    }
}

module.exports = { createUserController };