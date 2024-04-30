const { pomodoroCreate, pomodoroGet, pomodoroSettingsUpdate } = require('../models/pomodoro');

const createPomodoro = async (req, res) => {
    const user_id = req.user.id;
    const { id } = req.body;
    try {
        const result = await pomodoroCreate(
            id,
            user_id
        )
        if (result) {
            res.status(201).json({ message: "Pomodoro successfully created" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const getPomodoro = async (req, res) => {
    //const user_id = req.user.id;
    const user_id = 1;
    try {
        const result = await pomodoroGet(user_id);
        if (result) {
            res.status(200).json({ pomodoro: result })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

/*const updatePomodoro = async (req, res) => {
    const user_id = 1
    //const user_id = req.user.id;
    const {
        seconds_left, 
        is_paused, timer_mode, 
        work_mins, 
        break_mins, 
        long_break_mins, 
        work_mins_queued, 
        break_mins_queued, 
        long_break_mins_queued,
        num_sessions_to_long_break, 
        sessions_remaining, 
        pomodoros, 
        pomodoro_price, 
    } = req.body;
    try {
        const result = await pomodoroUpdate(
            seconds_left, 
            is_paused, timer_mode, 
            work_mins, 
            break_mins, 
            long_break_mins, 
            work_mins_queued, 
            break_mins_queued, 
            long_break_mins_queued,
            num_sessions_to_long_break, 
            sessions_remaining, 
            pomodoros, 
            pomodoro_price,
            user_id
        )
        if (result) {
            res.status(200).json({ message: "Pomodoro successfully updated" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}*/

const updatePomodoroSettings = async (req, res) => {
    const user_id = 1
    //const user_id = req.user.id;
    const {
            timer_mode,
            work_mins,
            break_mins,
            long_break_mins,
            num_sessions_to_long_break,
            pomodoro_price,
    } = req.body;
    try {
        const result = await pomodoroSettingsUpdate(
            timer_mode,
            work_mins,
            break_mins,
            long_break_mins,
            num_sessions_to_long_break,
            pomodoro_price,
            user_id
        )
        if (result) {
            res.status(200).json({ message: "Pomodoro settings successfully updated" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { createPomodoro, getPomodoro, updatePomodoroSettings };