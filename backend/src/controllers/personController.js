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

const criar = async (req, res) => {
    try {
        const novaPessoa = await personModel.criarPessoa(req.body, req.usuario.id);
        res.status(201).json(novaPessoa);
    } catch (erro) {
        console.error(erro); // Isso vai imprimir o erro no terminal do VS Code
        res.status(400).json({ 
            error: "Erro ao processar o cadastro.",
            details: erro.message // Adicione esta linha para ver o erro no Postman
        });
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

export { listar, criar, atualizarStatus };