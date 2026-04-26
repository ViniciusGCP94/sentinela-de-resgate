import express from 'express';
import * as personController from '../controllers/personController.js';
import { autenticar, autorizar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', autenticar, personController.listar);

router.post('/', autenticar, autorizar('acs'), personController.criar);

router.patch('/:id/status', autenticar, autorizar('defesa_civil'), personController.atualizarStatus);

export default router;