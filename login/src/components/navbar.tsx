import { AppBar, Box, Toolbar, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useModo } from '../context/ModoContefxt';

export default function NavBar() {
  const { modo, trocarModo } = useModo();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          {modo === 'aluno' ? (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: '#fff' }}>Matrícula</Button>
            </Link>
          ) : (
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
          exclusive
          onChange={(_, novo) => novo && trocarModo(novo)}
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
