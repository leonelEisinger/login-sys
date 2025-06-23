const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  try {
    const { nome, sobrenome, cpf, email, curso, telefone } = req.body;
    
    // Validação básica de CPF
    if (!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf)) {
      return res.status(400).json({ mensagem: 'CPF inválido. Formato esperado: 000.000.000-00' });
    }

    // Insere dados do aluno
    const resultado = await db.query(
      `INSERT INTO alunos 
      (nome, sobrenome, cpf, email, curso, telefone) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nome, sobrenome, cpf, email, curso, telefone]
    );
    
    res.status(201).json({
      sucesso: true,
      mensagem: 'Matrícula realizada com sucesso',
      aluno: resultado.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') { // Violação de chave única
      res.status(400).json({ mensagem: 'CPF ou Email já cadastrados' });
    } else {
      console.error('Erro na matrícula:', error);
      res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
  }
});

module.exports = router;