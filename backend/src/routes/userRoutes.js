import express from 'express';
import { criarUsuario, listarUsuarios } from '../controllers/userController.js';
import { autenticar, autorizar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/registro', criarUsuario);

router.get('/', autenticar, autorizar('defesa_civil'), listarUsuarios);

export default router;