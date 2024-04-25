const express = require('express');
const router = express.Router();
const { getUserData } = require('../controllers/user');
const { checkAuthenticated } = require('../middleware/authentication');

const profileRouter = express.Router();

profileRouter.get('/', getUserData);

module.exports = profileRouter;
