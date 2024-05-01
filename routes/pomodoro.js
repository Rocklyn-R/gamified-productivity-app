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

pomodoroRouter.post('/', createPomodoro);

pomodoroRouter.get('/', getPomodoro);

//pomodoroRouter.put('/', updatePomodoro);
pomodoroRouter.put('/update-settings', updatePomodoroSettings);

pomodoroRouter.put('/skip', skipUpdatePomodoro);

pomodoroRouter.put('/update-pomodoro', updatePomodoroCurrentTime);

pomodoroRouter.put('/sell', sellPomodoro);

pomodoroRouter.put('/pause', pausePomodoroTimer);

module.exports = pomodoroRouter;