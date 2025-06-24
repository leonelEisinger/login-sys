import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Disciplina = db.define('Disciplina', {
  codigo: { type: DataTypes.STRING, primaryKey: true },
  nome: DataTypes.STRING,
  vagas: DataTypes.INTEGER,
  periodoRecomendado: DataTypes.INTEGER,
  preRequisitos: DataTypes.ARRAY(DataTypes.STRING) // lista de códigos de pré-requisitos
}, { timestamps: false });

export default Disciplina;
