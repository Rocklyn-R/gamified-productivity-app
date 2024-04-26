const { taskCreateNew, tasksGet } = require('../models/tasks');

const getTasks = async (req, res) => {
    const user_id = 1;
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

module.exports = {
    createNewTask,
    getTasks
};