import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
} from "@mui/material";
import MatriculaService from "../services/matricula.service"; // Serviço de matrícula encapsulado


export default function RealizarMatricula() {
  // Estados do componente
  const [matricula, setMatricula] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigosDisciplinas, setCodigosDisciplinas] = useState<string[]>([]);
  const [mensagem, setMensagem] = useState("");


  const handleAdicionarCodigo = () => {
    if (codigo && !codigosDisciplinas.includes(codigo)) {
      setCodigosDisciplinas([...codigosDisciplinas, codigo]);
      setCodigo("");
    }
  };


  const handleRemoverCodigo = (remover: string) => {
    setCodigosDisciplinas(codigosDisciplinas.filter((c) => c !== remover));
  };

  // Envia os dados para confirmação
  const handleConfirmar = () => {
    MatriculaService.confirmarMatricula({ matricula, codigosDisciplinas })
      .then(() => {
        setMensagem("✅ Matrícula realizada com sucesso!");
        setMatricula("");
        setCodigosDisciplinas([]);
      })
      .catch((err) => {
        const msg = err.response?.data?.error || "❌ Erro ao realizar matrícula";
        setMensagem(msg);
      });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Realizar Matrícula</Typography>

      <Box mt={2}>
        <TextField
          label="Matrícula do Aluno"
          fullWidth
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
        />

        <Box display="flex" gap={2} mt={2}>
          <TextField
            label="Código da Disciplina"
            fullWidth
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdicionarCodigo()} // Adiciona com Enter
          />
          <Button 
            variant="contained" 
            onClick={handleAdicionarCodigo}
            disabled={!codigo}
          >
            Adicionar
          </Button>
        </Box>

        <Box mt={2}>
          {codigosDisciplinas.map((cod) => (
            <Chip
              key={cod}
              label={cod}
              onDelete={() => handleRemoverCodigo(cod)}
              sx={{ mr: 1, mb: 1 }}
              color="primary"
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleConfirmar}
          disabled={!matricula || codigosDisciplinas.length === 0}
        >
          Confirmar Matrícula
        </Button>

        {mensagem && (
          <Typography
            mt={2}
            color={mensagem.startsWith("✅") ? "green" : "error"}
            sx={{ fontWeight: 'bold' }}
          >
            {mensagem}
          </Typography>
        )}
      </Box>
    </Container>
  );
}