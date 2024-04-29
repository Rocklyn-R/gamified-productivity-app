const { 
    taskCreateNew, 
    tasksGet, 
    tasksHistoryGet,
    taskUpdateOverdue, 
    taskChangeCompletionStatus,
    taskEdit,
    taskDelete 
} = require('../models/tasks');

const getTasks = async (req, res) => {
    const user_id = req.user.id;
    try {
        const result = await tasksGet(user_id);
        res.status(200).json({ tasks: result });
    } catch (error) {
        console.error('Error retrieving tasks', error);
        res.status(500).json({ message: 'Internal server error'})
    }
}

const createNewTask = async (req, res) => {
    const user_id = req.user.id;
    const {
        id,
        name,
        notes,
        coin_reward,
        deadline,
        coin_penalty,
        overdue
    } = req.body;
    try {
        const result = await taskCreateNew(id, user_id, name, notes, coin_reward, deadline, coin_penalty, overdue);
        if (result) {
          res.status(201).json({ message: 'Task created successfully' });  
        } else {
            res.status(400).json({ message: 'Bad request'})
        }
    } catch (error) {
        console.error('Error creating task', error);
        res.status(500).json({ message: 'Internal server error' })
    }
};

const updateTaskOverdue = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await taskUpdateOverdue(id);
        if (result) {
            res.status(201).json({ message: 'Overdue task successfully updated'})
        }
    } catch (error) {
        console.error('Error marking task overdue', error);
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

const changeTaskCompletionStatus = async (req, res) => {
    const { completion_status, id } = req.body;
    try {
        const result = await taskChangeCompletionStatus(completion_status, id);
        if (result) {
            res.status(201).json({ message: `Task completion status successfully updated to ${completion_status}`})
        }
    } catch (error) {
        console.error('Error changing completion to incomplete');
        res.status(500).json({ message: 'Internal Server Error'})
    }
};

const getHistoryTasks = async (req, res) => {
    const { id } = req.user;
    try {
        const result = await tasksHistoryGet(id);
        if (result) {
            res.status(200).json({ historyTasks: result })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
};

const editTask = async (req, res) => {
    const { id, name, notes, coin_reward, deadline, coin_penalty } = req.body;
    try {
        const result = await taskEdit(id, name, notes, coin_reward, deadline, coin_penalty);
        if (result) {
            res.status(200).json({ message: 'Task successfully updated' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await taskDelete(id);
        if (result) {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
}





module.exports = {
    createNewTask,
    getTasks,
    updateTaskOverdue,
    changeTaskCompletionStatus,
    getHistoryTasks,
    editTask,
    deleteTask
};