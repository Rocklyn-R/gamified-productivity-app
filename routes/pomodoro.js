const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { 
    createPomodoro, 
    getPomodoro, 
    updatePomodoroSettings,
    skipUpdatePomodoro,
    updatePomodoroCurrentTime,
    sellPomodoro,
    pausePomodoroTimer
} = require('../controllers/pomodoro');

const pomodoroRouter = express.Router();

pomodoroRouter.post('/', checkAuthenticated, createPomodoro);

pomodoroRouter.get('/', checkAuthenticated, getPomodoro);

//pomodoroRouter.put('/', updatePomodoro);
pomodoroRouter.put('/update-settings', checkAuthenticated, updatePomodoroSettings);

pomodoroRouter.put('/skip',checkAuthenticated, skipUpdatePomodoro);

pomodoroRouter.put('/update-pomodoro', checkAuthenticated, updatePomodoroCurrentTime);

pomodoroRouter.put('/sell', checkAuthenticated, sellPomodoro);

pomodoroRouter.put('/pause', checkAuthenticated, pausePomodoroTimer);

module.exports = pomodoroRouter;