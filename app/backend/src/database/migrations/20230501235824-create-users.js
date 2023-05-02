'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
	await queryInterface.createTable('users', {
		id: {
		  allowNull: false,
		  autoIncrement: true,
		  primaryKey: true,
		  type: Sequelize.INTEGER,
		},
		username: {
		  allowNull: false,
		  type: Sequelize.STRING(30),
		},
		role: {
		  allowNull: false,
		  type: Sequelize.STRING(20),
		},
		email: {
		  allowNull: false,
		  type: Sequelize.STRING(50),
		},
		password: {
		  allowNull: false,
		  type: Sequelize.STRING(100),
		},
	  });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
	await queryInterface.dropTable('users');
  }
};
