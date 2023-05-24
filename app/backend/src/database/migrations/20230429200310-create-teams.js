'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

	await queryInterface.createTable('teams', {
		id: {
		  allowNull: false,
		  autoIncrement: true,
		  primaryKey: true,
		  type: Sequelize.INTEGER,
		},
		team_name: {
		  allowNull: false,
		  type: Sequelize.STRING(30),
		},
	  });
  },

  async down (queryInterface, Sequelize) {
	await queryInterface.dropTable('teams');
  }
};

//Fundamentado em: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/0ca77b1d-4770-4646-8368-167d2305e763/day/0da9bd44-abf6-43d6-96b9-9614274e6c36/lesson/cfc6c9f9-b329-4107-8e2b-6f8ff331bf28
