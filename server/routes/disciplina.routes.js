import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

// Listar todas as disciplinas
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM disciplina');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Erro ao buscar disciplinas' });
  }
});

// Adicionar nova disciplina
router.post('/adicionar', async (req, res) => {
  const { codigo, nome, vagas } = req.body;
  try {
    await db.query('INSERT INTO disciplina (codigo, nome, vagas) VALUES ($1, $2, $3)', [codigo, nome, vagas]);
    res.json({ message: 'Disciplina adicionada' });
  } catch {
    res.status(500).json({ error: 'Erro ao adicionar disciplina' });
  }
});

export default router;
