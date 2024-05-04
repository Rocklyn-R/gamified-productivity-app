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
    updateSecondsLeftPomodoroTimer,
    pausePlayPomodoroTimer
} = require('../controllers/pomodoro');

const pomodoroRouter = express.Router();

pomodoroRouter.post('/', checkAuthenticated, createPomodoro);

pomodoroRouter.get('/', checkAuthenticated, getPomodoro);

//pomodoroRouter.put('/', updatePomodoro);
pomodoroRouter.put('/update-settings', checkAuthenticated, updatePomodoroSettings);

pomodoroRouter.put('/skip',checkAuthenticated, skipUpdatePomodoro);

pomodoroRouter.put('/update-pomodoro', checkAuthenticated, updatePomodoroCurrentTime);

pomodoroRouter.put('/sell', checkAuthenticated, sellPomodoro);

pomodoroRouter.put('/update-seconds', checkAuthenticated, updateSecondsLeftPomodoroTimer);

pomodoroRouter.put('/pause-or-play', pausePlayPomodoroTimer)

module.exports = pomodoroRouter;