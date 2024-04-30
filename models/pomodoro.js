const db = require('../config/db');


const pomodoroCreate = async (
    id,
    user_id,
) => {
    const query = `
    INSERT INTO pomodoro
    (id, user_id, seconds_left, is_paused, timer_mode, 
        work_mins, break_mins, long_break_mins, num_sessions_to_long_break, 
        sessions_remaining, pomodoros, pomodoro_price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
    try {
        const result = await db.query(query, [
            id,
            user_id,
            1500,
            true,
            "work",
            25,
            5,
            15,
            4,
            4,
            0,
            10
        ]);
        return result;
    } catch (error) {
        throw error;
    }
}

const pomodoroGet = async (user_id) => {
    const query = `SELECT seconds_left, is_paused, timer_mode, 
    work_mins, break_mins, long_break_mins, 
    num_sessions_to_long_break, sessions_remaining, pomodoros, pomodoro_price 
    FROM pomodoro WHERE user_id = $1`
    try {
        const result = await db.query(query, [user_id])
        return result.rows;
    } catch (error) {
        throw error;
    }
}

/*const pomodoroUpdate = async (
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
    ) => {
    const query = `UPDATE pomodoro SET seconds_left = $1, is_paused = $2, timer_mode = $3, 
    work_mins = $4, break_mins = $5, long_break_mins $6, 
    work_mins_queued = $6, break_mins_queued = $8, long_break_mins_queued = $9,
    num_sessions_to_long_break = $10, sessions_remaining = $11, pomodoros = $12, pomodoro_price = $13 WHERE user_id = $14`

    try {
        const result = await db.query(query, [
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
        ])
        return result;
    } catch (error) {
        throw error;
    }
}*/

const pomodoroSettingsUpdate = async (
    timer_mode,
    work_mins,
    break_mins,
    long_break_mins,
    num_sessions_to_long_break,
    pomodoro_price,
    user_id
) => {
    const secondsLeftWork = work_mins * 60;
    const secondsLeftBreak = break_mins * 60;
    const secondsLeftLongBreak = long_break_mins * 60;
    const settingsQuery = `UPDATE pomodoro 
    SET work_mins = $1, 
        break_mins = $2, 
        long_break_mins= $3,
        num_sessions_to_long_break = $4, 
        pomodoro_price = $5
        WHERE user_id = $6`
    const secondsLeftQuery = `UPDATE pomodoro
    SET seconds_left = $1 WHERE user_id = $2`
    const timerModeQuery = `UPDATE pomodoro
    SET timer_mode = $1 WHERE user_id = $2`
    try {
        const result = await db.query(settingsQuery, [
            work_mins,
            break_mins,
            long_break_mins,
            num_sessions_to_long_break,
            pomodoro_price,
            user_id
        ]);
        console.log("this is running")
        await db.query(timerModeQuery, [timer_mode, user_id])
        if (timer_mode === "work") {
            await db.query(secondsLeftQuery, [secondsLeftWork, user_id])
        } else if (timer_mode === "break") {
            await db.query(secondsLeftQuery, [secondsLeftBreak, user_id])
        } else {
            await db.query(secondsLeftLongBreak, [secondsLeftLongBreak, user_id])
        }
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    pomodoroCreate,
    pomodoroGet,
    pomodoroSettingsUpdate
}