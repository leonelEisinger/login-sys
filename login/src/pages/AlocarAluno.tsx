import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Box,
} from "@mui/material";
import axios from "axios";

// faz a alocação dos alunos nas disciplinas selecionadas

export default function AlocarAluno() {
  
  const [alunos, setAlunos] = useState<any[]>([]);
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/alunos")
      .then((res) => setAlunos(res.data))
      .catch(() => setErro("Erro ao carregar alunos"));

    axios
      .get("http://localhost:3001/api/disciplinas")
      .then((res) => setDisciplinas(res.data))
      .catch(() => setErro("Erro ao carregar disciplinas"));
  }, []); // Executa apenas uma vez no montar do componente

  // Função para confirmar alocação
  const handleConfirmar = () => {
    // Validação dos campos
    if (!alunoSelecionado || selecionadas.length === 0) {
      setErro("Selecione um aluno e pelo menos uma disciplina");
      return;
    }

    // Envia dados para a API
    axios
      .post("http://localhost:3001/api/matricula/confirmar", {
        matricula: alunoSelecionado,
        codigosDisciplinas: selecionadas,
      })
      .then(() => {
        setErro("");
        alert("✅ Aluno alocado com sucesso!");
        // Reseta os estados após sucesso
        setAlunoSelecionado("");
        setSelecionadas([]);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao alocar aluno");
      });
  };

  // Renderização do componente
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Alocar Aluno em Disciplinas</Typography>

      {/* Seletor de aluno */}
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Selecione o Aluno</InputLabel>
        <Select
          value={alunoSelecionado}
          onChange={(e) => setAlunoSelecionado(e.target.value)}
          input={<OutlinedInput label="Selecione o Aluno" />}
        >
          {alunos.map((aluno) => (
            <MenuItem key={aluno.matricula} value={aluno.matricula}>
              {aluno.nome} ({aluno.matricula})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Seletor de disciplinas (múltipla escolha) */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Disciplinas Disponíveis:
      </Typography>

      <FormControl fullWidth>
        <Select
          multiple
          value={selecionadas}
          onChange={(e) => setSelecionadas(e.target.value as string[])}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(", ")}
        >
          {disciplinas.map((disc) => (
            <MenuItem key={disc.codigo} value={disc.codigo}>
              <Checkbox checked={selecionadas.indexOf(disc.codigo) > -1} />
              <ListItemText primary={`${disc.codigo} - ${disc.nome}`} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Botão de confirmação */}
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleConfirmar}
          disabled={!alunoSelecionado || selecionadas.length === 0}
        >
          ALOCAR ALUNO
        </Button>
      </Box>

      {/* Exibição de erros */}
      {erro && (
        <Typography color="error" sx={{ mt: 2 }}>
          {erro}
        </Typography>
      )}
    </Container>
  );
}