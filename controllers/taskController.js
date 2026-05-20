const taskService = require('../services/taskService');


const resolveErrorStatus = (message = '') => {
    if (message.includes('not found')) return 404;
    if (message.includes('already exists')) return 409;
    return 400;
};

exports.createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);

        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task,
        });
    } catch (error) {
        return res.status(resolveErrorStatus(error.message)).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();

        return res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getTaskById = async (req, res) => {
    try {
        const task = await taskService.getTaskById(req.params.id);

        return res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        return res.status(resolveErrorStatus(error.message)).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: task,
        });
    } catch (error) {
        return res.status(resolveErrorStatus(error.message)).json({
            success: false,
            message: error.message,
        });
    }
};


exports.patchTask = async (req, res) => {
    try {
        const task = await taskService.patchTask(req.params.id, req.body);

        return res.status(200).json({
            success: true,
            message: 'Task patched successfully',
            data: task,
        });
    } catch (error) {
        return res.status(resolveErrorStatus(error.message)).json({
            success: false,
            message: error.message,
        });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        await taskService.deleteTask(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    } catch (error) {
        return res.status(resolveErrorStatus(error.message)).json({
            success: false,
            message: error.message,
        });
    }
};