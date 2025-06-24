import Matricula from '../models/Matricula.js';

/*
 * Salva multiplas matriculas para um aluno, associando-o a varias disciplinas.
 */
const save = async (alunoMatricula, codigos) => {
  const trans = [];
  const now = new Date();

  for (const codigo of codigos) {
    trans.push(Matricula.create({
      alunoMatricula,       
      disciplinaCodigo: codigo, 
      status: 'CONFIRMADA', 
      data: now
    }));
  }

  return Promise.all(trans);
};

/*
 * Busca todas as matriculas associadas a um aluno.
 */
const findByAluno = async (alunoMatricula) =>
  Matricula.findAll({ where: { alunoMatricula } });

export default { save, findByAluno };
