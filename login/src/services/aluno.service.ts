import axios from 'axios';

const API = 'http://localhost:3001/api/aluno';

export default {
  listarAlunos() {
    return axios.get(`${API}/`);
  },

  buscarAlunoPorMatricula(matricula: string) {
    return axios.get(`${API}/${matricula}`);
  },

  criarAluno(aluno: {
    matricula: string;
    nome: string;
    curso: string;
    email?: string;
  }) {
    return axios.post(`${API}/criar`, aluno);
  },

  atualizarAluno(matricula: string, aluno: Partial<{
    nome: string;
    curso: string;
    email: string;
  }>) {
    return axios.put(`${API}/${matricula}`, aluno);
  },

  removerAluno(matricula: string) {
    return axios.delete(`${API}/${matricula}`);
  },

  listarDisciplinasAluno(matricula: string) {
    return axios.get(`${API}/${matricula}/disciplinas`);
  }
};