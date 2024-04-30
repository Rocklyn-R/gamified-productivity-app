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