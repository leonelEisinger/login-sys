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
  }, []);

  const handleConfirmar = () => {
    if (!alunoSelecionado || selecionadas.length === 0) {
      setErro("Selecione um aluno e pelo menos uma disciplina");
      return;
    }

    axios
      .post("http://localhost:3001/api/matricula/confirmar", {
        matricula: alunoSelecionado,
        codigosDisciplinas: selecionadas,
      })
      .then(() => {
        setErro("");
        alert("✅ Aluno alocado com sucesso!");
        setAlunoSelecionado("");
        setSelecionadas([]);
      })
      .catch((err) => {
        console.error(err);
        setErro("Erro ao alocar aluno");
      });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Alocar Aluno em Disciplinas</Typography>

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

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleConfirmar}
          disabled={!alunoSelecionado || selecionadas.length === 0}
        >
          ALOCAR ALUNO
        </Button>
      </Box>

      {erro && (
        <Typography color="error" sx={{ mt: 2 }}>
          {erro}
        </Typography>
      )}
    </Container>
  );
}
