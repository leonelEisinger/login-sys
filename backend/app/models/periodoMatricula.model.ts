// src/models/periodoMatricula.model.ts

/**
 * Implementa o modelo conforme diagrama:
 * 
 * # PeriodoMatricula
 * - id: long
 * - dataInicio: Date
 * - dataFin: Date
 * - ativo: boolean
 */
import { Model, DataTypes } from 'sequelize';
import db from '../config/database';

class PeriodoMatricula extends Model {
  public id!: number;
  public dataInicio!: Date;
  public dataFim!: Date;
  public ativo!: boolean;
}

PeriodoMatricula.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dataFim: {
    type: DataTypes.DATE,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: db,
  tableName: 'periodos_matricula',
  timestamps: false
});

export default PeriodoMatricula;