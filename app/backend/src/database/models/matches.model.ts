import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';
import db from '.';

import Team from './teams.model';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare awayTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: STRING(30),
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true, // isenta a necessidade de field, ja que converte camelCase para snake_case
  sequelize: db,
  modelName: 'matches', // faz referência ao nome da tabela.
  timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
});

Team.hasMany(Matches, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

Team.hasMany(Matches, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

Matches.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Matches.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default Matches;

// Fonte: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/4e3b7d3a-94a1-4fce-9545-0f2b04f8ccd9/day/55580b57-6754-49bc-83bf-465967e0d2a1/lesson/70a59622-f05f-44cc-b3ce-6e5c28435f25
