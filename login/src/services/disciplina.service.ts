import axios from 'axios';

// Define a URL base da API para disciplinas
const API = 'http://localhost:3001/api/disciplina';

export default {
  listarDisciplinas() {
    return axios.get(`${API}/`);
  },
  adicionarDisciplina(disciplina: { codigo: string; nome: string; vagas: number }) {
    return axios.post(`${API}/adicionar`, disciplina);
  }
};
