import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { AlunoDTO } from '../models/AlunoDTO';
import { DisciplinaDTO } from '../models/DisciplinaDTO';
import MatriculaService from '../services/matricula.service';
import DisciplinaService from '../services/disciplina.service';

const alunoMock: AlunoDTO = {
  matricula: '123456',
  nome: 'João da Silva',
  curso: 'Sistemas de Informação',
};

export default function RealizarMatricula() {
  const [disciplinas, setDisciplinas] = useState<DisciplinaDTO[]>([]);
  const [selecionadas, setSelecionadas] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState('');

  useEffect(() => {
    DisciplinaService.listarDisciplinas()
      .then(res => setDisciplinas(res.data))
      .catch(() => setStatus('Erro ao carregar disciplinas'));
  }, []);

  const toggleSelecionada = (codigo: string) => {
    setSelecionadas(prev => {
      const next = new Set(prev);
      next.has(codigo) ? next.delete(codigo) : next.add(codigo);
      return next;
    });
  };

  const handleConfirmar = () => {
    const codigos = Array.from(selecionadas);
    MatriculaService.confirmarMatricula(alunoMock, codigos)
      .then(() => setStatus('✅ Matrícula confirmada!'))
      .catch(() => setStatus('❌ Erro na matrícula'));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Matrícula do Aluno</Typography>
      <Typography>Aluno: {alunoMock.nome}</Typography>
      <List>
        {disciplinas.map(d => (
          <ListItem key={d.codigo}>
            <Checkbox
              checked={selecionadas.has(d.codigo)}
              onChange={() => toggleSelecionada(d.codigo)}
            />
            <ListItemText primary={`${d.nome} (${d.codigo})`} secondary={`Vagas: ${d.vagas}`} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleConfirmar}>Confirmar Matrícula</Button>
      {status && <Typography sx={{ mt: 2 }}>{status}</Typography>}
    </Container>
  );
}
