export const createPomodoro = async (
    id: string,
) => {
    try {
        const response = await fetch('http://localhost:4000/pomodoro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                id
            })
        })
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }
}

export const getPomodoro = async () => {
    try {
        const response = await fetch('http://localhost:4000/pomodoro', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        const pomodoroData = await response.json();
        if (response.ok) {
            return pomodoroData.pomodoro[0];
        } else return {}
    } catch (error) {
        console.log(error);
    }
}

export const updatePomodoroSettings = async (
    timer_mode: "break" | "longBreak" | "work",
    work_mins: number,
    break_mins: number,
    long_break_mins: number,
    num_sessions_to_long_break: number,
    sessions_remaining: number,
    pomodoro_price: number,
) => {

    try {
        const response = await fetch('http://localhost:4000/pomodoro/update-settings', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                timer_mode,
                work_mins,
                break_mins,
                long_break_mins,
                num_sessions_to_long_break,
                sessions_remaining,
                pomodoro_price
            })
        })
 
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }
}

export const skipTimerUpdate = async (
    sessions_remaining: number,
    timer_mode: "break" | "work" | "longBreak",
    work_mins: number,
    break_mins: number,
    long_break_mins: number,
    num_sessions_to_long_break: number
) => {
    try {
        const response = await fetch('http://localhost:4000/pomodoro/skip', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                sessions_remaining,
                timer_mode,
                work_mins,
                break_mins,
                long_break_mins,
                num_sessions_to_long_break
            })
        })
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }
}

export const updatePomodoroCurrentTime = async (
    seconds_left: number,
    timer_mode: "work" | "break" | "longBreak",
    sessions_remaining: number,
    pomodoros: number
) => {
    try {
        console.log("THIS RUNNIN")
        const response = await fetch('http://localhost:4000/pomodoro/update-pomodoro', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                seconds_left,
                timer_mode,
                sessions_remaining,
                pomodoros
            })
        })
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }
}

export const pomodoroSale = async (quantity: number) => {
    try {
        console.log("THIS RUNNIN")
        const response = await fetch('http://localhost:4000/pomodoro/sell', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ quantity })
        })
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    } 
}

export const pausePomodoroTimer = async (seconds_left: number) => {
    try {
        const response = await fetch('http://localhost:4000/pomodoro/pause', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ seconds_left })
        })
        if (response.ok) {
            return true;
        } else return false;
    } catch (error) {
        console.log(error);
    }  
}