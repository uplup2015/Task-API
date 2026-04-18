const taskService = require('../services/taskService');

const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const task = await taskService.createTask(req.user.userId, title, description);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        next(error);
    }
};

const getTasks = async (req, res, next) => {
    const { status } = req.query;

    try {
        const tasks = await taskService.getTasks(req.user.userId, status);
        res.json({ tasks });
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await taskService.getTaskById(req.user.userId, taskId);
        res.json({ task });
    } catch (error) {
        next(error);
    }
}

const updateTask = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        const { title, description, status } = req.body;

        const updatedTask = await taskService.updateTask(req.user.userId, taskId, { 
            title, description, status
        });
        res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const taskId = parseInt(req.params.id);
        await taskService.deleteTask(req.user.userId, taskId);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
} 

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };