const express = require('express');
const router = express.Router();
const { getUserData, editUserName, editUserEmail, changeUserPassword } = require('../controllers/user');
const { checkAuthenticated } = require('../middleware/authentication');

const profileRouter = express.Router();

profileRouter.get('/', checkAuthenticated, getUserData);

profileRouter.put('/updateUsername', checkAuthenticated, editUserName);

profileRouter.put('/updateEmail', editUserEmail);

profileRouter.put('/changePassword', changeUserPassword);

module.exports = profileRouter;
