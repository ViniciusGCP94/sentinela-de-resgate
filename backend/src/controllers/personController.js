import * as personModel from '../models/person.js';

const listar = async (req, res) => {
    try {
        const { neighborhood, status } = req.query;
        const pessoas = await personModel.listarPessoas({ neighborhood, status }, req.usuario);
        res.json(pessoas);
    } catch (erro) {
        console.error('Erro ao listar pessoas:', erro);
        res.status(500).json({ error: 'Erro interno ao buscar registros de pessoas.' });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pessoa = await personModel.buscarPorId(id); 

        if (!pessoa) {
            return res.status(404).json({ error: 'Pessoa não encontrada.' });
        }

        res.json(pessoa); 
    } catch (erro) {
        console.error('Erro ao buscar pessoa:', erro);
        res.status(500).json({ error: 'Erro ao buscar detalhes da pessoa.' });
    }
};

const criar = async (req, res) => {
   try {
        const novaPessoa = await personModel.criarPessoa(req.body, req.usuario.id);
        res.status(201).json({
            mensagem: 'Cidadão cadastrado com sucesso!',
            pessoa: novaPessoa
        });
    } catch (erro) {
        console.error(erro);
        if (erro.code === '23505') {
            return res.status(400).json({ error: 'Este CPF já está cadastrado no sistema.' });
        }
        res.status(500).json({ error: 'Erro ao processar o cadastro.', details: erro.message });
    }
};

const atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const pessoaAtualizada = await personModel.atualizarStatus(id, status);
        
        if (!pessoaAtualizada) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        res.json({
            mensagem: 'Status de resgate atualizado!',
            pessoa: pessoaAtualizada
        });
    } catch (erro) {
        console.error('Erro ao atualizar status:', erro);
        res.status(500).json({ error: 'Erro ao atualizar o status de resgate.' });
    }
};

export { listar, criar, atualizarStatus, buscarPorId };