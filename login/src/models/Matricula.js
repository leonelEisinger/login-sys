import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Matricula = db.define('Matricula', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  data: DataTypes.DATE,
  status: DataTypes.STRING,
  alunoMatricula: DataTypes.STRING,
  disciplinaCodigo: DataTypes.STRING
}, { timestamps: false });

export default Matricula;
