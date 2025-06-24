import Matricula from '../models/Matricula.js';

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

const findByAluno = async (alunoMatricula) =>
  Matricula.findAll({ where: { alunoMatricula } });

export default { save, findByAluno };
