import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usuarioRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Servidor rodando',
    timestamp: new Date().toISOString()
  });
});

export default app;