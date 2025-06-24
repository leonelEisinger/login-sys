// server/routes/disciplina.routes.js

import { Router } from 'express';
import {
  listarDisciplinas,
  inserirDisciplina
} from '../DAO/disciplinaDAO.js'; // ✅ Importando o DAO de disciplina

const router = Router();

// ROTA: Listar todas as disciplinas
// Relacionado ao caso de uso "Gerenciar Disciplinas"
router.get('/', async (req, res) => {
  try {
    const result = await listarDisciplinas(); // 🧱 DAO faz a query
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar disciplinas:', error);
    res.status(500).json({ error: 'Erro ao buscar disciplinas' });
  }
});

// ROTA: Adicionar nova disciplina
// Fluxo de cadastro no caso de uso "Gerenciar Disciplinas"
router.post('/adicionar', async (req, res) => {
  const { codigo, nome, vagas, curso, periodo } = req.body;

  if (!codigo || !nome || !vagas) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
  }

  try {
    await inserirDisciplina({ codigo, nome, vagas, curso, periodo }); // 🧱 DAO faz o insert
    res.json({ message: 'Disciplina adicionada com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar disciplina:', error);
    res.status(500).json({ error: 'Erro ao adicionar disciplina' });
  }
});



export default router;
