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
            console.log(data.tasks);
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