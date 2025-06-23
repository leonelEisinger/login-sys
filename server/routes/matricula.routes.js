import express from 'express';
const router = express.Router();
import db from '../config/db.js';


router.post('/confirmar', async (req, res) => {
  const { matricula, codigosDisciplinas } = req.body;
  
  // Validate input
  if (!matricula || !codigosDisciplinas || !Array.isArray(codigosDisciplinas)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    // Verify student exists
    const aluno = await db.query('SELECT 1 FROM aluno WHERE matricula = $1', [matricula]);
    if (aluno.rows.length === 0) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    // Start transaction
    await db.query('BEGIN');

    for (const codigo of codigosDisciplinas) {
      // Verify discipline exists
      const disciplina = await db.query('SELECT 1 FROM disciplina WHERE codigo = $1', [codigo]);
      if (disciplina.rows.length === 0) {
        await db.query('ROLLBACK');
        return res.status(404).json({ error: `Disciplina ${codigo} não encontrada` });
      }

      // Check if already enrolled
      const matriculaExistente = await db.query(
        'SELECT 1 FROM matricula WHERE matricula_aluno = $1 AND codigo_disciplina = $2',
        [matricula, codigo]
      );
      if (matriculaExistente.rows.length > 0) {
        await db.query('ROLLBACK');
        return res.status(409).json({ error: `Aluno já matriculado na disciplina ${codigo}` });
      }

      // Enroll student
      await db.query(
        'INSERT INTO matricula (matricula_aluno, codigo_disciplina) VALUES ($1, $2)',
        [matricula, codigo]
      );
    }

    await db.query('COMMIT');
    res.json({ message: 'Matrícula confirmada com sucesso' });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro na matrícula:', error);
    res.status(500).json({ error: 'Erro interno ao processar matrícula' });
  }
});

// matricula.routes.js
router.use((req, res, next) => {
  console.log(`Matricula route hit: ${req.method} ${req.path}`);
  next();
});

export default router;
