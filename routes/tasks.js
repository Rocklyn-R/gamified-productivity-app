const express = require('express');
const router = express.Router();

const tasksRouter = express.Router();

tasksRouter.get('/', (req, res, next) => {
    console.log(req.session);
    res.status(201).send();
} )

module.exports = tasksRouter;