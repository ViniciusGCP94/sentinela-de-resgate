import * as medModel from '../models/medication.js';

const adicionarMedicamento = async (req, res) => {
    try {
        const { person_id, nome, dosagem, frequencia } = req.body;
        const novoMed = await medModel.registrarMedicamento(person_id, nome, dosagem, frequencia);
        res.status(201).json(novoMed);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar medicamento' });
    }
};

const listarPorPessoa = async (req, res) => {
    try {
        const { person_id } = req.params;
        const meds = await medModel.buscarMedicamentosPorPessoa(person_id);
        res.json(meds);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar medicamentos' });
    }
};

const deletarMedicamento = async (req, res) => {
    try {
        const { id } = req.params;
        await medModel.deletarMedicamento(id);
        res.json({ mensagem: 'Medicamento removido com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: 'Erro ao deletar medicamento.' });
    }
};

export { adicionarMedicamento, listarPorPessoa, deletarMedicamento };