// Corresponde à verificação do período de matrícula (verificarPeriodoMatricula)
// Fluxo 3 do caso de uso "Realizar Matrícula"


import axios from 'axios';

const API_URL = 'http://localhost:3001/api/matricula';

class MatriculaService {
  confirmarMatricula(data: { matricula: string; codigosDisciplinas: string[] }) {
    return axios.post(`${API_URL}/confirmar`, data);
  }
}

export default new MatriculaService();
