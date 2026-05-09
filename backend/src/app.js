import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import personRoutes from './routes/personRoutes.js';
import medicationRoutes from './routes/medicationRoutes.js';
import materialRoutes from './routes/materialRoutes.js';

const app = express();

app.use(cors({ 
  origin: [
    'http://localhost:5173',
    'https://sentinela-de-resgate.vercel.app' 
  ]
}));
app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/pessoas', personRoutes);
app.use('/api/medicamentos', medicationRoutes);
app.use('/api/materiais', materialRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Servidor rodando',
    timestamp: new Date().toISOString()
  });
});

export default app;