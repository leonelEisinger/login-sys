import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// ROTA: Confirmar matrícula (inserção)
router.post('/confirmar', async (req, res) => {
  const { matricula, codigosDisciplinas } = req.body;

  if (!matricula || !Array.isArray(codigosDisciplinas)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const aluno = await db.query('SELECT 1 FROM aluno WHERE matricula = $1', [matricula]);
    if (aluno.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await db.query('BEGIN');

    for (const codigo of codigosDisciplinas) {
      const disciplina = await db.query('SELECT 1 FROM disciplina WHERE codigo = $1', [codigo]);
      if (disciplina.rows.length === 0) {
        await db.query('ROLLBACK');
        return res.status(404).json({ error: `Disciplina ${codigo} não encontrada` });
      }

      const jaMatriculado = await db.query(
        'SELECT 1 FROM matricula WHERE matricula_aluno = $1 AND codigo_disciplina = $2',
        [matricula, codigo]
      );
      if (jaMatriculado.rows.length > 0) {
        await db.query('ROLLBACK');
        return res.status(409).json({ error: `Aluno já matriculado na disciplina ${codigo}` });
      }

      await db.query(
        'INSERT INTO matricula (matricula_aluno, codigo_disciplina) VALUES ($1, $2)',
        [matricula, codigo]
      );
    }

    await db.query('COMMIT');
    res.status(200).json({ message: 'Matrícula confirmada com sucesso' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao confirmar matrícula:', error);
    res.status(500).json({ error: 'Erro interno ao confirmar matrícula' });
  }
});

// ROTA: Atualizar matrícula (substituir disciplinas)
router.put('/atualizar', async (req, res) => {
  const { matricula, novasDisciplinas } = req.body;

  if (!matricula || !Array.isArray(novasDisciplinas)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const aluno = await db.query('SELECT 1 FROM aluno WHERE matricula = $1', [matricula]);
    if (aluno.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    await db.query('BEGIN');

    await db.query('DELETE FROM matricula WHERE matricula_aluno = $1', [matricula]);

    for (const codigo of novasDisciplinas) {
      const disciplina = await db.query('SELECT 1 FROM disciplina WHERE codigo = $1', [codigo]);
      if (disciplina.rows.length === 0) {
        await db.query('ROLLBACK');
        return res.status(404).json({ error: `Disciplina ${codigo} não encontrada` });
      }

      await db.query(
        'INSERT INTO matricula (matricula_aluno, codigo_disciplina) VALUES ($1, $2)',
        [matricula, codigo]
      );
    }

    await db.query('COMMIT');
    res.status(200).json({ message: 'Matrícula atualizada com sucesso' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao atualizar matrícula:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar matrícula' });
  }
});

// Log de rota para debug
router.use((req, res, next) => {
  console.log(`Rota [MATRÍCULA] acessada: ${req.method} ${req.originalUrl}`);
  next();
});

export default router;
