'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

	await queryInterface.createTable('matches', {
		id: {
		  primaryKey: true,
		  autoIncrement: true,
		  allowNull: false,
		  type: Sequelize.INTEGER,
		},
		home_team_id: {
		  allowNull: false,
		  references: {
			model: 'teams',
			key: 'id',
		  },
		  field: 'home_team_id',
		  onUpdate: 'CASCADE',
		  onDelete: 'CASCADE',
		  type: Sequelize.INTEGER,
		},
		away_team_id: {
		  allowNull: false,
		  references: {
			model: 'teams',
			key: 'id',
		  },
		  field: 'away_team_id',
		  onUpdate: 'CASCADE',
		  onDelete: 'CASCADE',
		  type: Sequelize.INTEGER,
		},
		home_team_goals: {
		  allowNull: false,
		  type: Sequelize.INTEGER,
		},
		away_team_goals: {
		  allowNull: false,
		  type: Sequelize.INTEGER,
		},
		in_progress: {
		  allowNull: false,
		  defaultValue: true,
		  type: Sequelize.BOOLEAN,
		},
	  });
  },

  down: async (queryInterface, Sequelize) => {
	await queryInterface.dropTable('matches');
  }
};

//Fundametado em: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/4e3b7d3a-94a1-4fce-9545-0f2b04f8ccd9/day/55580b57-6754-49bc-83bf-465967e0d2a1/lesson/70a59622-f05f-44cc-b3ce-6e5c28435f25