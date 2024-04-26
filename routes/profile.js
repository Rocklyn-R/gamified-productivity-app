const express = require('express');
const router = express.Router();
const { getUserData, editUserName, editUserEmail, changeUserPassword } = require('../controllers/user');
const { checkAuthenticated } = require('../middleware/authentication');

const profileRouter = express.Router();

profileRouter.get('/', checkAuthenticated, getUserData);

profileRouter.put('/updateUsername', checkAuthenticated, editUserName);

profileRouter.put('/updateEmail', checkAuthenticated, editUserEmail);

profileRouter.put('/changePassword', checkAuthenticated, changeUserPassword);

module.exports = profileRouter;
