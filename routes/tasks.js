const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');

const tasksRouter = express.Router();

tasksRouter.get('/', checkAuthenticated, (req, res, next) => {
    console.log(req.session);
    console.log(req.user);
    res.status(201).send();
} )

module.exports = tasksRouter;