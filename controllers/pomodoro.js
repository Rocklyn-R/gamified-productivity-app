const {
    pomodoroCreate,
    pomodoroGet,
    pomodoroSettingsUpdate,
    pomodoroSkipUpdate,
    pomodoroCurrentTimeUpdate,
    pomodoroSell,
    pomodoroPauseTimer
} = require('../models/pomodoro');

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
    const user_id = req.user.id;
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
    const user_id = req.user.id;
    const {
        timer_mode,
        work_mins,
        break_mins,
        long_break_mins,
        num_sessions_to_long_break,
        sessions_remaining,
        pomodoro_price,
    } = req.body;
    try {
        const result = await pomodoroSettingsUpdate(
            timer_mode,
            work_mins,
            break_mins,
            long_break_mins,
            num_sessions_to_long_break,
            sessions_remaining,
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

const skipUpdatePomodoro = async (req, res) => {
    const user_id = req.user.id;
    const {
        sessions_remaining,
        timer_mode,
        break_mins,
        long_break_mins,
        work_mins,
        num_sessions_to_long_break
    } = req.body;
    try {
        const result = await pomodoroSkipUpdate(
            user_id,
            sessions_remaining,
            timer_mode,
            work_mins,
            break_mins,
            long_break_mins,
            num_sessions_to_long_break
        )
        if (result) {
            res.status(200).json({ message: "Pomodoro successfully updated" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const updatePomodoroCurrentTime = async (req, res) => {
    const user_id = req.user.id
    const {
        seconds_left,
        timer_mode,
        sessions_remaining,
        pomodoros
    } = req.body;
    try {
        const result = await pomodoroCurrentTimeUpdate(
            user_id,
            seconds_left,
            timer_mode,
            sessions_remaining,
            pomodoros
        );
        if (result) {
            res.status(200).json({ message: "Pomodoro successfully updated" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const sellPomodoro = async (req, res) => {
    const user_id = req.user.id;
    const { quantity } = req.body;
    try {
        const result = await pomodoroSell(quantity, user_id);
        if (result) {
            res.status(200).json({ message: "Pomodoro successfully sold" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

const pausePomodoroTimer = async (req, res) => {
    const user_id = 1;
    const { seconds_left } = req.body;
    try {
        const result = await pomodoroPauseTimer(seconds_left, user_id);
        if (result) {
            res.status(200).json({ message: "Pomodoro paused successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}



module.exports = {
    createPomodoro,
    getPomodoro,
    updatePomodoroSettings,
    skipUpdatePomodoro,
    updatePomodoroCurrentTime,
    sellPomodoro,
    pausePomodoroTimer
};