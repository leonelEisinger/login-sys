import axios from 'axios';

// Define a URL base da API para matriculas
const API_URL = 'http://localhost:3001/api/matricula';

class MatriculaService {
  confirmarMatricula(data: { matricula: string; codigosDisciplinas: string[] }) {
    return axios.post(`${API_URL}/confirmar`, data);
  }
}

export default new MatriculaService();
