const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { 
    createNewTask, 
    getTasks, 
    updateTaskOverdue, 
    changeTaskCompletionStatus,
    getHistoryTasks, 
    editTask,
    deleteTask
} = require('../controllers/tasks');

const tasksRouter = express.Router();


tasksRouter.get('/', checkAuthenticated, getTasks);

tasksRouter.post('/create-task', checkAuthenticated, createNewTask);

tasksRouter.put('/task-overdue', checkAuthenticated, updateTaskOverdue);

tasksRouter.put('/move-to-history', checkAuthenticated, changeTaskCompletionStatus);

tasksRouter.get('/history', checkAuthenticated, getHistoryTasks);

tasksRouter.put('/edit-task', checkAuthenticated, editTask);

tasksRouter.delete('/delete-task', checkAuthenticated, deleteTask);

module.exports = tasksRouter;