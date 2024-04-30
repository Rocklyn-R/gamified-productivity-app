

export const getTasks = async () => {
    try {
        const response = await fetch('http://localhost:4000/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const data = await response.json();

        if (response.ok) {
            const reversedTasks = data.tasks.reverse();
            return reversedTasks;
        } else return [];

    } catch (error) {
        throw error;
    }
}

export const createNewTask = async (
    id: string,
    name: string,
    notes: string,
    coin_reward: number | null,
    deadline: string,
    coin_penalty: number | null,
    overdue: boolean
) => {
    try {
        const response = await fetch('http://localhost:4000/tasks/create-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id, name, notes, coin_reward, deadline, coin_penalty, overdue })
        })

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}

export const changeToOverDue = async (id: string) => {
    try {
        const response = await fetch('http://localhost:4000/tasks/task-overdue', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id })
        })
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const changeCompletionStatus = async (completion_status: string, id: string, path: string) => {
    try {
        const response = await fetch(`http://localhost:4000/tasks/${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ completion_status, id })
        })
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

export const getHistoryTasks = async () => {
    try {
        const response = await fetch('http://localhost:4000/tasks/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const data = await response.json();
        if (response.ok) {
             const reversedTasks = data.historyTasks.reverse();
            return reversedTasks;
        } else return [];

    } catch (error) {
        throw error;
    }
};

export const updateTask = async (
    id: string,
    name: string,
    notes: string,
    coin_reward: number,
    deadline: string,
    coin_penalty: number
) => {
    try {
        const response = await fetch('http://localhost:4000/tasks/edit-task', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id, name, notes, coin_reward, deadline, coin_penalty })
        })

        if (response.ok) {
            return true;
        } else return false;

    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (id: string) => {
    try {
        const response = await fetch('http://localhost:4000/tasks/delete-task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ id })
        })

        if (response.ok) {
            return true;
        } else return false;

    } catch (error) {
        throw error;
    }
};