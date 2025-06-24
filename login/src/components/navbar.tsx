import { AppBar, Box, Toolbar, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useModo } from '../context/ModoContext';

// Componente NavBar que renderiza a barra de navegação
export default function NavBar() {
  // Obtém o modo atual (aluno/professor) e a função para trocá-lo do contexto
  const { modo, trocarModo } = useModo();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          {modo === 'aluno' ? (
            // Link para a página principal no modo aluno
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff' }}>Matrícula</Button>
            </Link>
          ) : (
            // Fragmento com links específicos para o modo professor
            <>
              <Link to="/professor" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: '#fff' }}>Disciplinas</Button>
              </Link>
              <Link to="/professor/alocar" style={{ textDecoration: 'none' }}>
                <Button sx={{ color: '#fff' }}>Alocar Aluno</Button>
              </Link>
            </>
          )}
        </Box>

        <ToggleButtonGroup
          value={modo}
          exclusive  // Permite apenas um botão selecionado por vez
          onChange={(_, novo) => novo && trocarModo(novo)}  // Troca o modo quando um botão é clicado
          size="small"
          color="primary"
        >
          <ToggleButton value="aluno">Professor</ToggleButton>
          <ToggleButton value="professor">Aluno</ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  );
}