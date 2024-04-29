const express = require('express');
const router = express.Router();
const { createUserController } = require('../controllers/user');
const { createCoins } = require('../controllers/coins');

const signUpRouter = express.Router();

signUpRouter.post('/', createUserController, createCoins);

module.exports = signUpRouter;