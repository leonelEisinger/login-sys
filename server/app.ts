import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import dotenv from 'dotenv'
import { pool } from './db'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/auth', authRoutes)

// Testar conexão com o banco
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Erro ao conectar ao PostgreSQL:', err)
  else console.log('Conexão com PostgreSQL bem-sucedida:', res.rows[0].now)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})