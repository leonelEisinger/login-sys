import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import DisciplinaService from '../services/disciplina.service';

export default function ProfessorDashboard() {
  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [vagas, setVagas] = useState<number>(0);
  const [mensagem, setMensagem] = useState('');

  const handleAdicionar = () => {
    DisciplinaService.adicionarDisciplina({ codigo, nome, vagas })
      .then(() => setMensagem('✅ Disciplina adicionada!'))
      .catch(() => setMensagem('❌ Erro ao adicionar'));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Dashboard do Professor</Typography>
      <Box mt={2}>
        <TextField label="Código" value={codigo} onChange={e => setCodigo(e.target.value)} fullWidth />
        <TextField label="Nome" value={nome} onChange={e => setNome(e.target.value)} fullWidth sx={{ mt: 2 }} />
        <TextField
          label="Vagas"
          type="number"
          value={vagas}
          onChange={e => setVagas(parseInt(e.target.value))}
          fullWidth sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdicionar}>Adicionar Disciplina</Button>
        {mensagem && <Typography sx={{ mt: 2 }}>{mensagem}</Typography>}
      </Box>
    </Container>
  );
}
