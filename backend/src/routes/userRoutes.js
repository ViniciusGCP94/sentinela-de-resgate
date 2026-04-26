import express from 'express';
import { criarUsuario, listarUsuarios } from '../controllers/userController.js'

const router = express.Router();

router.post('/registro', criarUsuario);
router.get('/', listarUsuarios);

export default router;