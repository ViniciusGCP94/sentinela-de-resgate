import express from 'express';
import { adicionarMaterial, listarPorPessoa, marcarAtendida, deletarMaterial } from '../controllers/materialController.js';
import { autenticar, autorizar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', autenticar, autorizar('acs'), adicionarMaterial);
router.get('/:person_id', autenticar, listarPorPessoa);
router.patch('/:id/atender', autenticar, autorizar('defesa_civil'), marcarAtendida);
router.delete('/:id', autenticar, autorizar('acs'), deletarMaterial);

export default router;