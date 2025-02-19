const {
    createUser,
    findUserById,
    userUpdateName,
    userUpdateEmail,
    userUpdatePassword,
    userUnlinkFromGoogle,
    userDeleteAccount,
    userDataGet,
    findUserByEmail,
    tokenAdd,
    tokenCheck,
    passwordReset
} = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const createUserController = async (req, res, next) => {

    const { first_name, last_name, email, password } = req.body;
    console.log(first_name, last_name, email, password);
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await createUser(first_name, last_name, email, hashedPassword);
        req.login(newUser, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                res.status(500).json({ message: 'Failed to log in user' });
            } else {
                next();
            }
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

const getUserData = async (req, res) => {
    const id = req.user.id;
    try {
        const userData = await userDataGet(id);
        if (userData) {
            let userObject = {
                ...userData,
                password: userData.password === null ? false : true,
                google_id: userData.google_id === null ? false : true
            }
            res.status(200).json(userObject);
        }
    } catch (error) {
        console.log('Error creating user:', error);
    }
}

const editUserName = async (req, res) => {
    const { firstName, lastName } = req.body;
    const id = req.user.id;
    try {
        const userUpdate = await userUpdateName(id, firstName, lastName);
        if (userUpdate) {
            res.status(200).json({ message: 'User name successfully updated' });
        } else {
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

const createNewPassword = async (req, res) => {
    const { password } = req.body;
    const { id } = req.user;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createdPassword = await userUpdatePassword(id, hashedPassword);
        if (createdPassword) {
            res.status(200).json({ mesage: "Password successfully created" })
        } else {
            res.status(404).json({ message: "Password not created" })
        }
    } catch (error) {
        throw error;
    }
}

const unlinkUserFromGoogle = async (req, res) => {
    const { id } = req.user;
    try {
        const result = await userUnlinkFromGoogle(id);
        if (result) {
            res.status(200).json({ mesage: "Google account successfully unlinked" })
        }
    } catch (error) {
        res.status(404).json({ message: "An error occurred unlinking Google" })
    }
}

const deleteUserAccount = async (req, res) => {
    const { id } = req.user;
    const { password } = req.body;
    try {
        const user = await findUserById(id);
        const storedPassword = user.password;
        const matchedPassword = await bcrypt.compare(password, storedPassword);
        if (matchedPassword) {
            const accountDeletion = await userDeleteAccount(id);
            if (accountDeletion) {
                req.logout(function (err) {
                    if (err) {
                        console.error("Error logging out:", err);
                        // Handle error
                        res.status(500).json({ message: "Error logging out" });
                    } else {
                        console.log("Logged out successfully");
                        res.status(200).json({ message: "Account successfully deleted" });
                    }
                });
            }
        } else {
            console.log("password no match")
            res.status(404).json({ message: "Password don't match" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const checkForUserEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const result = await findUserByEmail(email);
        if (result) {
            res.status(200).json({ message: "User found" })
        } else {
            res.status(200).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(404).json({ message: "An error occurred." })
    }
}

function generateResetToken() {
    return crypto.randomBytes(20).toString('hex'); // 20 bytes => 40 characters
}

const sendResetEmail = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user exists
        const userResult = await findUserByEmail(email);

        if (!userResult) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = userResult.id;
        const token = generateResetToken();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        const addToken = await tokenAdd(userId, token, expiresAt);

        // Generate a password reset link
        const resetLink = `https://task-master-rocklyn.onrender.com/reset-password/${token}`;

        // Configure email transporter (using Gmail as an example)
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        if (addToken) {
            // Send the email
            await transporter.sendMail({
                from: '"Rocklyn Apps" <rocklyn.apps@gmail.com>',
                to: email,
                subject: "Password Reset Request - Task Master Pro",
                html: `<p>Click <a href="${resetLink}">here</a> to reset your Task Master Pro password. This link will expire in 1 hour.</p>`,
            });

            return res.json({ message: "Reset email sent successfully" });
        }

    } catch (error) {
        console.error("Error sending reset email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const checkToken = async (req, res) => {
    const { token } = req.query;
    try {
        const result = await tokenCheck(token);
        if (result) {
            res.status(200).json({ valid: result.valid, message: result.message, user_id: result.user_id })
        } 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

const resetPassword = async (req, res) => {
    const { password, user_id } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await passwordReset(hashedPassword, user_id);
        if (result) {
            res.status(200).json({ valid: result.valid, message: result.message, user_id: result.user_id })
        } 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    createUserController,
    getUserData,
    editUserName,
    editUserEmail,
    changeUserPassword,
    createNewPassword,
    unlinkUserFromGoogle,
    deleteUserAccount,
    checkForUserEmail,
    sendResetEmail,
    checkToken,
    resetPassword
};