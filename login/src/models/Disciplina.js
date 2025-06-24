import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// Define o modelo 'Disciplina' usando o Sequelize
const Disciplina = db.define('Disciplina', {
  codigo: { type: DataTypes.STRING, primaryKey: true},
  nome: DataTypes.STRING,
  vagas: DataTypes.INTEGER,
  periodoRecomendado: DataTypes.INTEGER,
  preRequisitos: DataTypes.ARRAY(DataTypes.STRING)
  
}, { timestamps: false});

export default Disciplina;