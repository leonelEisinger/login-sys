import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// Define o modelo 'PeriodoMatricula' usando o Sequelize

const PeriodoMatricula = db.define('PeriodoMatricula', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dataInicio: DataTypes.DATE,
  dataFim: DataTypes.DATE,
  ativo: DataTypes.BOOLEAN
}, { timestamps: false });

export default PeriodoMatricula;
