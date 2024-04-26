const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { createNewTask, getTasks } = require('../controllers/tasks');

const tasksRouter = express.Router();


tasksRouter.get('/', checkAuthenticated, getTasks);

tasksRouter.post('/create-task', checkAuthenticated, createNewTask)

module.exports = tasksRouter;