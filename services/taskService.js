const { Task } = require('../dao/models');

const userNameValidator = /^[A-Za-z\s.]+$/;
const userPattern = /^(?:[A-Za-z]{3,})(?:[.\s][A-Za-z]+)*$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const urlPattern = /^https?:\/\/[\w.-]+(\.[\w.-]+)+([/#?].*)?$/i;


const sanitizeTask = (task) => {
    if (!task) return null;
    const { createdAt, updatedAt, ...taskData } = task.toJSON();
    return taskData;
};


const validateTaskData = (data, isPatch = false) => {
    if (!data || Object.keys(data).length === 0) {
        throw new Error('Request body required');
    }

    const {
        assigneeName, taskName, assigneeEmail, dueDate, dueTime,
        priorityLevel, estimatedHours, projectUrl, taskDescription, taskTypes, taskStatus
    } = data;

    const trimmedAssigneeName = assigneeName?.trim();
    const trimmedTaskName = taskName?.trim();
    const trimmedEmail = assigneeEmail?.trim().toLowerCase();
    const trimmedUrl = projectUrl?.trim();
    const trimmedDescription = taskDescription?.trim();
    const trimmedPriority = priorityLevel?.trim();
    const trimmedStatus = taskStatus?.trim();
    const trimmedDate = dueDate?.trim();
    const trimmedTime = dueTime?.trim();


    if (!isPatch) {
        const required = {
            assigneeName: trimmedAssigneeName,
            taskName: trimmedTaskName,
            assigneeEmail: trimmedEmail,
            dueDate: trimmedDate,
            dueTime: trimmedTime,
            priorityLevel: trimmedPriority,
            estimatedHours,
            projectUrl: trimmedUrl,
            taskDescription: trimmedDescription,
            taskStatus: trimmedStatus,
        };

        const missing = Object.entries(required)
            .filter(([, v]) => !v && v !== 0)
            .map(([k]) => k);

        if (missing.length > 0) {
            throw new Error(`The following fields are required: ${missing.join(', ')}`);
        }

        if (!taskTypes || !Array.isArray(taskTypes) || taskTypes.length === 0) {
            throw new Error('Select at least one task type');
        }
    }

    // Assignee Name
    if (assigneeName !== undefined) {
        if (!trimmedAssigneeName) {
            throw new Error('Assignee name cannot be empty');
        }
        if (trimmedAssigneeName.length < 3) {
            throw new Error('Assignee name must be at least 3 characters');
        }
        if (!userNameValidator.test(trimmedAssigneeName)) {
            throw new Error('Assignee name cannot include numbers or special characters');
        }
        if (trimmedAssigneeName.startsWith('.') || trimmedAssigneeName.endsWith('.')) {
            throw new Error('Assignee name cannot start or end with a dot');
        }
        if (!userPattern.test(trimmedAssigneeName)) {
            throw new Error('Invalid assignee name format');
        }
    }

    // Task name
    if (taskName !== undefined) {
        if (!trimmedTaskName) {
            throw new Error('Task name cannot be empty');
        }
        if (trimmedTaskName.length < 3) {
            throw new Error('Task name must be at least 3 characters');
        }
        if (trimmedTaskName.length > 100) {
            throw new Error('Task name cannot exceed 100 characters');
        }
    }

    // Assignee Email
    if (assigneeEmail !== undefined) {
        if (!trimmedEmail) {
            throw new Error('Email cannot be empty');
        }
        if (!trimmedEmail.includes('@')) {
            throw new Error('Email must include @ symbol');
        }
        if (!emailPattern.test(trimmedEmail)) {
            throw new Error('Invalid email format');
        }
        if (trimmedEmail.length > 100) {
            throw new Error('Email too long');
        }
    }

    // Due Date
    if (dueDate !== undefined) {
        if (!trimmedDate) {
            throw new Error('Due date cannot be empty');
        }
        if (isNaN(Date.parse(trimmedDate))) {
            throw new Error('Invalid due date format');
        }
    }

    // Due Time
    if (dueTime !== undefined) {
        if (!trimmedTime) {
            throw new Error('Due time cannot be empty');
        }
    }

    // Priority Level
    const VALID_PRIORITIES = ['low', 'medium', 'high'];
    if (priorityLevel !== undefined) {
        if (!trimmedPriority) {
            throw new Error('Priority cannot be empty');
        }
        if (!VALID_PRIORITIES.includes(trimmedPriority.toLowerCase())) {
            throw new Error(`Priority must be one of: ${VALID_PRIORITIES.join(', ')}`);
        }
    }

    // Hours
    if (estimatedHours !== undefined) {
        const parsedHours = Number(estimatedHours);
        if (isNaN(parsedHours)) {
            throw new Error('Estimated hours must be a number');
        }
        if (!Number.isFinite(parsedHours) || parsedHours <= 0) {
            throw new Error('Estimated hours must be greater than 0');
        }
        if (parsedHours > 9999) {
            throw new Error('Estimated hours value is unreasonably large');
        }
    }

    // URL
    if (projectUrl !== undefined) {
        if (!trimmedUrl) {
            throw new Error('Project URL cannot be empty');
        }
        if (!/^https?:\/\//i.test(trimmedUrl)) {
            throw new Error('URL must start with http:// or https://');
        }
        if (!urlPattern.test(trimmedUrl)) {
            throw new Error('Invalid URL format');
        }
    }

    // Description
    if (taskDescription !== undefined) {
        if (!trimmedDescription) {
            throw new Error('Task description cannot be empty');
        }
        if (trimmedDescription.length < 3) {
            throw new Error('Task description must be at least 3 characters');
        }
        if (trimmedDescription.length > 2000) {
            throw new Error('Task description cannot exceed 2000 characters');
        }
    }

    // Task types
    if (taskTypes !== undefined) {
        if (!Array.isArray(taskTypes) || taskTypes.length === 0) {
            throw new Error('Select at least one task type');
        }
    }

    // Status
    const VALID_STATUSES = ['pending', 'in-progress'];
    if (taskStatus !== undefined) {
        if (!trimmedStatus) {
            throw new Error('Status cannot be empty');
        }
        if (!VALID_STATUSES.includes(trimmedStatus.toLowerCase())) {
            throw new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
        }
    }

    // Return trimmed/normalised values
    return {
        ...(assigneeName !== undefined && { assigneeName: trimmedAssigneeName }),
        ...(taskName !== undefined && { taskName: trimmedTaskName }),
        ...(assigneeEmail !== undefined && { assigneeEmail: trimmedEmail }),
        ...(dueDate !== undefined && { dueDate: trimmedDate }),
        ...(dueTime !== undefined && { dueTime: trimmedTime }),
        ...(priorityLevel !== undefined && { priorityLevel: trimmedPriority?.toLowerCase() }),
        ...(estimatedHours !== undefined && { estimatedHours: Number(estimatedHours) }),
        ...(projectUrl !== undefined && { projectUrl: trimmedUrl }),
        ...(taskDescription !== undefined && { taskDescription: trimmedDescription }),
        ...(taskTypes !== undefined && { taskTypes }),
        ...(taskStatus !== undefined && { taskStatus: trimmedStatus?.toLowerCase() }),
    };
};


const checkNameExists = async (name, excludeId = null) => {
    if (name === undefined) return;

    const existing = await Task.findOne({ where: { taskName: name } });

    if (existing && existing.id !== excludeId) {
        throw new Error('Task name already exists');
    }
};


// CREATE
exports.createTask = async (taskData) => {
    const cleaned = validateTaskData(taskData);

    await checkNameExists(cleaned.taskName);

    const task = await Task.create(cleaned);
    return sanitizeTask(task);
};


// GET ALL
exports.getAllTasks = async () => {
    return await Task.findAll({
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
};


// GET BY ID
exports.getTaskById = async (id) => {
    const task = await Task.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
};


// UPDATE
exports.updateTask = async (id, updatedData) => {
    const task = await Task.findByPk(id);
    if (!task) throw new Error('Task not found');

    const cleaned = validateTaskData(updatedData);

    await checkNameExists(cleaned.taskName, task.id);

    await task.update(cleaned);
    return sanitizeTask(task);
};


// // PATCH
// exports.patchTask = async (id, updatedData) => {
//     const task = await Task.findByPk(id);
//     if (!task) throw new Error('Task not found');

//     const cleaned = validateTaskData(updatedData, true);

//     if (cleaned.taskName && cleaned.taskName !== task.taskName) {
//         await checkNameExists(cleaned.taskName, task.id);
//     }

//     await task.update(cleaned);
//     return sanitizeTask(task);
// };


// DELETE
exports.deleteTask = async (id) => {
    const task = await Task.findByPk(id);
    if (!task) throw new Error('Task not found');

    await task.destroy();
    return true;
};