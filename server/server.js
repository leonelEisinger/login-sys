import express from 'express';
import cors from 'cors';
import matriculaRoutes from './routes/matricula.routes.js';
import disciplinaRoutes from './routes/disciplina.routes.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/matricula', matriculaRoutes);
app.use('/api/disciplina', disciplinaRoutes);

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
