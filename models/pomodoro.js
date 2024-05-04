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

const pomodoroSettingsUpdate = async (
    timer_mode,
    work_mins,
    break_mins,
    long_break_mins,
    num_sessions_to_long_break,
    sessions_remaining,
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
        sessions_remaining = $5, 
        pomodoro_price = $6
        WHERE user_id = $7`
    const secondsLeftQuery = `UPDATE pomodoro
    SET seconds_left = $1 WHERE user_id = $2`
    const timerModeQuery = `UPDATE pomodoro
    SET timer_mode = $1 WHERE user_id = $2`
    const oldSessionsToLongBreakQuery = `SELECT num_sessions_to_long_break FROM pomodoro WHERE user_id = $1`;
    const oldSessionsToLongBreakResult = await db.query(oldSessionsToLongBreakQuery, [user_id]);
    const oldSessionsToLongBreak = oldSessionsToLongBreakResult.rows[0].num_sessions_to_long_break;
    const completedSessions = oldSessionsToLongBreak - sessions_remaining;
    let newSessionsRemaining;
    if (completedSessions >= num_sessions_to_long_break) {
        newSessionsRemaining = num_sessions_to_long_break;
    } else {
        newSessionsRemaining = num_sessions_to_long_break - completedSessions;
    }
    try {
        const result = await db.query(settingsQuery, [
            work_mins,
            break_mins,
            long_break_mins,
            num_sessions_to_long_break,
            newSessionsRemaining,
            pomodoro_price,
            user_id
        ]);
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

const pomodoroSkipUpdate = async (
    user_id,
    sessions_remaining,
    timer_mode,
    work_mins,
    break_mins,
    long_break_mins,
    num_sessions_to_long_break
) => {
    const skipQuery = `
    UPDATE pomodoro 
    SET timer_mode = $1, 
    seconds_left = $2, 
    sessions_remaining = $3
    WHERE user_id = $4`

    let newMode;
    let newSecondsLeft;
    let newSessionsRemaining;

    if (timer_mode === "work" && sessions_remaining > 1) {
        newMode = "break";
        newSecondsLeft = break_mins * 60;
        newSessionsRemaining = sessions_remaining - 1;
    } else if (timer_mode === "work" && sessions_remaining === 1) {
        newMode = "longBreak";
        newSecondsLeft = long_break_mins * 60;
        newSessionsRemaining = 0;
    } else if (timer_mode === "longBreak") {
        newMode = "work";
        newSecondsLeft = work_mins * 60;
        newSessionsRemaining = num_sessions_to_long_break;
    } else {
        newMode = "work";
        newSecondsLeft = work_mins * 60;
        newSessionsRemaining = sessions_remaining;
    }
    const response = await db.query(skipQuery, [newMode, newSecondsLeft, newSessionsRemaining, user_id]);
    return response;
}

const pomodoroCurrentTimeUpdate = async (
    user_id,
    seconds_left,
    is_paused,
    timer_mode,
    sessions_remaining,
    pomodoros
) => {
    const query = `
    UPDATE pomodoro
    SET seconds_left = $1,
    is_paused = $2,
    timer_mode = $3,
    sessions_remaining = $4,
    pomodoros = $5
    WHERE user_id = $6` 
    try {
        const result = await db.query(query, [seconds_left, is_paused, timer_mode, sessions_remaining, pomodoros, user_id]);
        return result;
    } catch (error) {
        throw error;
    }
}

const pomodoroSell = async (quantity, user_id) => {
    const query = `
    UPDATE pomodoro
    SET pomodoros = pomodoros - $1
    WHERE user_id = $2`
    try {
        const result = await db.query(query, [quantity, user_id]);
        return result;
    } catch (error) {
        throw error;
    }
}

const pomodoroUpdateSecondsLeft = async (seconds_left, user_id) => {
    const query = `UPDATE pomodoro SET seconds_left = $1 WHERE user_id = $2`;
    try {
        const result = await db.query(query, [seconds_left, user_id])
        return result;
    } catch (error) {
        throw error;
    }
}

const pomodoroPausePlayTimer = async (is_paused_boolean, user_id) => {
    const query = `UPDATE pomodoro SET is_paused = $1 WHERE user_id = $2`;
    try {
        const result = await db.query(query, [is_paused_boolean, user_id])
        return result;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    pomodoroCreate,
    pomodoroGet,
    pomodoroSettingsUpdate,
    pomodoroSkipUpdate,
    pomodoroCurrentTimeUpdate,
    pomodoroSell,
    pomodoroUpdateSecondsLeft,
    pomodoroPausePlayTimer
}