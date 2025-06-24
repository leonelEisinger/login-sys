import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

export default function ProfessorDashboard() {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [vagas, setVagas] = useState<number>(0);
  const [mensagem, setMensagem] = useState("");

  const [matriculaAluno, setMatriculaAluno] = useState("");
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/disciplina")
      .then((res) => setDisciplinas(res.data))
      .catch(() => setMensagem("❌ Erro ao carregar disciplinas"));
  }, []);

  const handleAdicionar = () => {
    axios
      .post("http://localhost:3001/api/disciplina", { codigo, nome, vagas })
      .then(() => setMensagem("✅ Disciplina adicionada!"))
      .catch(() => setMensagem("❌ Erro ao adicionar"));
  };

  const handleAtualizarMatricula = () => {
    axios
      .put("http://localhost:3001/api/matricula/atualizar", {
        matricula: matriculaAluno,
        novasDisciplinas: selecionadas,
      })
      .then((res) => setMensagem(res.data.message))
      .catch((err) =>
        setMensagem(
          err.response?.data?.error || "❌ Erro ao atualizar matrícula"
        )
      );
  };

  const toggleDisciplina = (codigo: string) => {
    setSelecionadas((prev) =>
      prev.includes(codigo)
        ? prev.filter((c) => c !== codigo)
        : [...prev, codigo]
    );
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Dashboard do Professor</Typography>

      {/* Adicionar Disciplina */}
      <Box mt={4}>
        <Typography variant="h6">Adicionar nova disciplina</Typography>
        <TextField
          label="Código"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          fullWidth
        />
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label="Vagas"
          type="number"
          value={vagas}
          onChange={(e) => setVagas(parseInt(e.target.value))}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdicionar}>
          Adicionar Disciplina
        </Button>
      </Box>

      {/* Atualizar Matrícula */}
      <Box mt={6}>
        <Typography variant="h6">Atualizar matrícula de aluno</Typography>
        <TextField
          label="Matrícula do Aluno"
          value={matriculaAluno}
          onChange={(e) => setMatriculaAluno(e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />

        <Typography sx={{ mt: 2 }}>Selecionar novas disciplinas:</Typography>
        {disciplinas.map((disc: any) => (
          <FormControlLabel
            key={disc.codigo}
            control={
              <Checkbox
                checked={selecionadas.includes(disc.codigo)}
                onChange={() => toggleDisciplina(disc.codigo)}
              />
            }
            label={`${disc.nome} (${disc.codigo})`}
          />
        ))}

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={handleAtualizarMatricula}
        >
          Atualizar Matrícula
        </Button>
      </Box>

      {mensagem && <Typography sx={{ mt: 4 }}>{mensagem}</Typography>}
    </Container>
  );
}
