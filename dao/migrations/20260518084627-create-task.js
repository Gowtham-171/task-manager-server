
'use strict';

module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('tasks', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },

      assigneeName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      taskName: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },

      assigneeEmail: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      dueTime: {
        type: Sequelize.TIME,
        allowNull: false
      },

      priorityLevel: {
        type: Sequelize.ENUM(
          'Low',
          'Medium',
          'High'
        ),
        allowNull: false
      },

      estimatedHours: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      projectUrl: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      taskDescription: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      taskProgress: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      taskTypes: {
        type: Sequelize.JSON,
        allowNull: false
      },

      taskStatus: {
        type: Sequelize.ENUM(
          'Pending',
          'In Progress',
          'Completed'
        ),
        allowNull: false,
        defaultValue: 'Pending'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('tasks');

  }

};