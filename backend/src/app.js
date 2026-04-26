import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Servidor rodando',
    timestamp: new Date().toISOString()
  });
});

export default app;