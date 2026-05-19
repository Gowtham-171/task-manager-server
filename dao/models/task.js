
module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define('Task', {

        assigneeName: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        taskName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        assigneeEmail: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        dueTime: {
            type: DataTypes.TIME,
            allowNull: false
        },

        priorityLevel: {
            type: DataTypes.ENUM('Low', 'Medium', 'High'),
            allowNull: false
        },

        estimatedHours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        projectUrl: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        taskDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        taskProgress: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },

        taskTypes: {
            type: DataTypes.JSON,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                'Pending',
                'In Progress',
                'Completed'
            ),
            allowNull: false,
            defaultValue: 'Pending'
        }

    }, {

        tableName: 'tasks',
        timestamps: true

    });

    return Task;
};