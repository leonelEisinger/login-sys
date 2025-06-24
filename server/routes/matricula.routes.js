// Metodo relacionado ao passo 1 e 2 do diagrama de sequencia: solicitarDisciplinasDisponiveis()

import express from 'express';
import {
  verificarAlunoExiste,
  verificarDisciplinaExiste,
  verificarJaMatriculado,
  inserirMatricula,
  removerTodasMatriculas,
} from '../repository/matriculaRepository.js';
import db from '../config/db.js';

const router = express.Router();
router.post('/confirmar', async (req, res) => {
  const { matricula, codigosDisciplinas } = req.body;

  if (!matricula || !Array.isArray(codigosDisciplinas)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const aluno = await verificarAlunoExiste(matricula);
    if (aluno.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await db.query('BEGIN');

    for (const codigo of codigosDisciplinas) {
      const disciplina = await verificarDisciplinaExiste(codigo);
      if (disciplina.rows.length === 0) {
        await db.query('ROLLBACK');
        return res.status(404).json({ error: `Disciplina ${codigo} não encontrada` });
      }

      const jaMatriculado = await verificarJaMatriculado(matricula, codigo);
      if (jaMatriculado.rows.length > 0) {
        await db.query('ROLLBACK');
        return res.status(409).json({ error: `Aluno já matriculado na disciplina ${codigo}` });
      }

      await inserirMatricula(matricula, codigo);
    }

    await db.query('COMMIT');
    res.status(200).json({ message: 'Matrícula confirmada com sucesso' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao confirmar matrícula:', error);
    res.status(500).json({ error: 'Erro interno ao confirmar matrícula' });
  }
});

// Corresponde ao fluxo alternativo de alteração de matrícula
router.put('/atualizar', async (req, res) => {
  const { matricula, novasDisciplinas } = req.body;

  if (!matricula || !Array.isArray(novasDisciplinas)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const aluno = await verificarAlunoExiste(matricula);
    if (aluno.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await db.query('BEGIN');
    await removerTodasMatriculas(matricula);

    for (const codigo of novasDisciplinas) {
      const disciplina = await verificarDisciplinaExiste(codigo);
      if (disciplina.rows.length === 0) {
        await db.query('ROLLBACK');
        return res.status(404).json({ error: `Disciplina ${codigo} não encontrada` });
      }

      await inserirMatricula(matricula, codigo);
    }

    await db.query('COMMIT');
    res.status(200).json({ message: 'Matrícula atualizada com sucesso' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao atualizar matrícula:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar matrícula' });
  }
});

// Middleware de log para rastrear chamadas de rota
router.use((req, res, next) => {
  console.log(`Rota [MATRÍCULA] acessada: ${req.method} ${req.originalUrl}`);
  next();
});

export default router;
