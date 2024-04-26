const { createUser, findUserById, userUpdateName, userUpdateEmail, userUpdatePassword } = require('../models/user');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');

const createUserController = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await createUser(first_name, last_name, email, hashedPassword);
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

const editUserName = async (req, res) => {
    const { firstName, lastName } = req.body;
    const id = req.user.id;
    console.log(req.user);
    try {
        //console.log("Running");
        const userUpdate = await userUpdateName(id, firstName, lastName);
        if (userUpdate) {
            res.status(200).json({ message: 'User name successfully updated' });
        } else {
            //console.log("This ain't working");
            res.status(404).json({ message: 'User not found or update unsuccessful' })
        }
    } catch (error) {
        console.error('Error creating user:', error);
    }
};

const editUserEmail = async (req, res) => {
    const { email } = req.body;
    const { id } = req.user;
    try {
        const userEmailUpdate = await userUpdateEmail(id, email);
        if (userEmailUpdate) {
            res.status(200).json({ message: 'User email successfully updated' });
        } else {
            res.status(404).json({ message: 'User not found or update unsuccessful' });
        }
    } catch (error) {
        console.log('Error creating user:', error);
    }
}

const changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;
    try {
        const user = await findUserById(id);
        const password = user.password;
        const salt = await bcrypt.genSalt(10);
        const matchedPassword = await bcrypt.compare(oldPassword, password);
        if (matchedPassword) {
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);
            const userPasswordChange = await userUpdatePassword(id, hashedNewPassword);
            if (userPasswordChange) {
                res.status(200).json({ message: 'Password change successful' });
            } else {
                res.status(404).json({ message: 'Password change failed' });
            }
        } else {
            res.status(404).json({ message: 'Old password incorrect' })
        }
    } catch (error) {
        console.log('Error changing password:', error);
    }
}



module.exports = {
    createUserController,
    getUserData,
    editUserName,
    editUserEmail,
    changeUserPassword
};