
import axios from 'axios';

const API = 'http://localhost:3001/api/matricula';

export default {
  confirmarMatricula(aluno: { matricula: string }, codigosDisciplinas: string[]) {
    return axios.post(`${API}/confirmar`, { 
      matricula: aluno.matricula,
      codigosDisciplinas
    });
  }
};