const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { 
    createNewTask, 
    getTasks, 
    updateTaskOverdue, 
    changeTaskCompletionStatus,
    getHistoryTasks 
} = require('../controllers/tasks');

const tasksRouter = express.Router();


tasksRouter.get('/', checkAuthenticated, getTasks);

tasksRouter.post('/create-task', checkAuthenticated, createNewTask);

tasksRouter.put('/task-overdue', updateTaskOverdue);

tasksRouter.put('/move-to-history', changeTaskCompletionStatus);

tasksRouter.get('/history', getHistoryTasks);

module.exports = tasksRouter;