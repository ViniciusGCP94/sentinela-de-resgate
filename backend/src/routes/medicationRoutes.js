import express from 'express';
import { adicionarMedicamento, listarPorPessoa, deletarMedicamento } from '../controllers/medicationController.js';
import { autenticar, autorizar } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', autenticar, adicionarMedicamento);
router.get('/:person_id', autenticar, listarPorPessoa);
router.delete('/:id', autenticar, autorizar('acs'), deletarMedicamento);


export default router;