// dao/migrations/XXXXXXXXXXXXXX-create-task.js

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

      username: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },

      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      time: {
        type: Sequelize.TIME,
        allowNull: false
      },

      priority: {
        type: Sequelize.ENUM(
          'Low',
          'Medium',
          'High'
        ),
        allowNull: false
      },

      hours: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      url: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      progress: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },

      taskTypes: {
        type: Sequelize.JSON,
        allowNull: false
      },

      status: {
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