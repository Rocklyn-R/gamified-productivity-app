const express = require('express');
const passport = require('passport');

const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
    // Logout the user and provide a callback function
    req.logout((err) => {
        if (err) {
            // Handle any error that occurred during logout
            return res.status(500).json({ error: 'Failed to logout' });
        }

        // Logout successful, send a success response
        return res.status(200).json({ message: 'Logout successful' });
    });
});



module.exports = logoutRouter;