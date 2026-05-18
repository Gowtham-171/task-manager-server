
module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define('Task', {

        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        time: {
            type: DataTypes.TIME,
            allowNull: false
        },

        priority: {
            type: DataTypes.ENUM('Low', 'Medium', 'High'),
            allowNull: false
        },

        hours: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        url: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        progress: {
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