import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Matricula from './components/Matricula';
import Login from './components/Login';
import Painel from './components/Painel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Matricula />} />
        <Route path="/login" element={<Login />} />
        <Route path="/painel" element={<Painel />} />
      </Routes>
    </Router>
  );
}

export default App;