import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Checkbox,
  Button,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { AlunoDTO } from '../models/AlunoDTO';
import { DisciplinaDTO } from '../models/DisciplinaDTO';
import MatriculaService from '../services/matricula.service';
import DisciplinaService from '../services/disciplina.service';
import AlunoService from '../services/aluno.service';

export default function AlocarAluno() {
  const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
  const [disciplinas, setDisciplinas] = useState<DisciplinaDTO[]>([]);
  const [selectedAluno, setSelectedAluno] = useState<string>('');
  const [selectedDisciplinas, setSelectedDisciplinas] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Load students and subjects
    Promise.all([
      AlunoService.listarAlunos(),
      DisciplinaService.listarDisciplinas()
    ])
      .then(([alunosRes, disciplinasRes]) => {
        setAlunos(alunosRes.data);
        setDisciplinas(disciplinasRes.data);
      })
      .catch(() => setStatus('Erro ao carregar dados'));
  }, []);

  const toggleDisciplina = (codigo: string) => {
    setSelectedDisciplinas(prev => {
      const next = new Set(prev);
      next.has(codigo) ? next.delete(codigo) : next.add(codigo);
      return next;
    });
  };

  const handleAlocar = () => {
    if (!selectedAluno) {
      setStatus('❌ Selecione um aluno');
      return;
    }

    const aluno = alunos.find(a => a.matricula === selectedAluno);
    const codigosDisciplinas = Array.from(selectedDisciplinas);

    if (aluno) {
      MatriculaService.confirmarMatricula(aluno, codigosDisciplinas)
        .then(() => setStatus('✅ Aluno alocado com sucesso!'))
        .catch(() => setStatus('❌ Erro ao alocar aluno'));
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Alocar Aluno em Disciplinas</Typography>
      
      <FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
        <InputLabel>Selecione o Aluno</InputLabel>
        <Select
          value={selectedAluno}
          onChange={(e) => setSelectedAluno(e.target.value)}
          label="Selecione o Aluno"
        >
          {alunos.map(aluno => (
            <MenuItem key={aluno.matricula} value={aluno.matricula}>
              {aluno.nome} ({aluno.matricula}) - {aluno.curso}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ mt: 2 }}>Disciplinas Disponíveis:</Typography>
      <List>
        {disciplinas.map(d => (
          <ListItem key={d.codigo}>
            <Checkbox
              checked={selectedDisciplinas.has(d.codigo)}
              onChange={() => toggleDisciplina(d.codigo)}
              disabled={!selectedAluno}
            />
            <ListItemText 
              primary={`${d.nome} (${d.codigo})`} 
              secondary={`Vagas: ${d.vagas}`} 
            />
          </ListItem>
        ))}
      </List>

      <Button 
        variant="contained" 
        onClick={handleAlocar}
        disabled={!selectedAluno || selectedDisciplinas.size === 0}
      >
        Alocar Aluno
      </Button>

      {status && <Typography sx={{ mt: 2 }}>{status}</Typography>}
    </Container>
  );
}