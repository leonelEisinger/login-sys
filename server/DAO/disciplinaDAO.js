import Disciplina from '../models/Disciplina.js';

// Objeto DAO para operações em Disciplina


const buscarPorCursoPeriodo = async (curso, periodo) =>
  Disciplina.findAll({ where: { periodoRecomendado: periodo } });

const verificarVagas = async codigo => {
  const disc = await Disciplina.findByPk(codigo);
  return disc && disc.vagas > 0;
};

export default { buscarPorCursoPeriodo, verificarVagas };
