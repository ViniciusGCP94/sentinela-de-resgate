import * as matModel from '../models/materialNeed.js';

const adicionarMaterial = async (req, res) => {
    try {
        const { person_id, categoria, descricao } = req.body;
        const novoMat = await matModel.registrarMaterial(person_id, categoria, descricao);
        res.status(201).json({
            mensagem: 'Necessidade material registrada com sucesso!',
            material: novoMat
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: 'Erro ao registrar necessidade material.' });
    }
};

const listarPorPessoa = async (req, res) => {
    try {
        const { person_id } = req.params;
        const materiais = await matModel.buscarMateriaisPorPessoa(person_id);
        res.json(materiais);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: 'Erro ao buscar necessidades materiais.' });
    }
};

const marcarAtendida = async (req, res) => {
    try {
        const { id } = req.params;
        const materialAtualizado = await matModel.marcarAtendida(id);
        if (!materialAtualizado) {
            return res.status(404).json({ error: 'Item não encontrado.' });
        }
        res.json({
            mensagem: 'Necessidade marcada como atendida!',
            material: materialAtualizado
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: 'Erro ao atualizar item.' });
    }
};

const deletarMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        await matModel.deletarMaterial(id);
        res.json({ mensagem: 'Item removido com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: 'Erro ao deletar item.' });
    }
};

export { adicionarMaterial, listarPorPessoa, marcarAtendida, deletarMaterial };