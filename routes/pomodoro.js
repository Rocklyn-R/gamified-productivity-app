const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authentication');
const { createPomodoro, getPomodoro, updatePomodoroSettings } = require('../controllers/pomodoro');

const pomodoroRouter = express.Router();

pomodoroRouter.post('/', createPomodoro);

pomodoroRouter.get('/', getPomodoro);

//pomodoroRouter.put('/', updatePomodoro);
pomodoroRouter.put('/update-settings', updatePomodoroSettings);

module.exports = pomodoroRouter;