import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RealizarMatricula from './pages/RealizarMatricula';
import ProfessorDashboard from './pages/ProfessorDashboard';
import AlocarAluno from './pages/AlocarAluno';
import NavBar from './components/navbar';
import { ModoProvider } from './context/ModoContext';

function App() {
  return (
    <ModoProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<RealizarMatricula />} />
          <Route path="/professor" element={<ProfessorDashboard />} />
          <Route path="/professor/alocar" element={<AlocarAluno />} />
        </Routes>
      </Router>
    </ModoProvider>
  );
}

export default App;
