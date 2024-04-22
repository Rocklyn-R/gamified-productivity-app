const express = require('express');
const router = express.Router();
const { createUserController } = require('../controllers/user');

const signUpRouter = express.Router();

signUpRouter.post('/', createUserController)

module.exports = signUpRouter;