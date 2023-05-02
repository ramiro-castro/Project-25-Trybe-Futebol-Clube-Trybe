import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(30),
    allowNull: false,
  },
  role: {
    type: STRING(20),
    allowNull: false,
  },
  email: {
    type: STRING(50),
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  underscored: true, // isenta a necessidade de field, ja que converte camelCase para snake_case
  sequelize: db,
  modelName: 'users', // faz referência ao nome da tabela.
  timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`
});

export default User;

// Fonte: https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/4e3b7d3a-94a1-4fce-9545-0f2b04f8ccd9/day/55580b57-6754-49bc-83bf-465967e0d2a1/lesson/70a59622-f05f-44cc-b3ce-6e5c28435f25
