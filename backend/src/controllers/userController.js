import bcrypt from 'bcryptjs';
import * as usuarioModel from '../models/user.js';

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, cargo } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
        }

        const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUsuario = await usuarioModel.criarUsuario(nome, email, senhaHash, cargo);

        res.status(201).json({
            mensagem: 'Usuário criado com sucesso!',
            usuario: novoUsuario
        });

    } catch (erro) {
        console.error('Erro no registro:', erro);
        res.status(500).json({ error: 'Erro interno ao criar usuário.' });
    }
};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.buscarTodosUsuarios(); 
        
        res.status(200).json(usuarios); 
    } catch (erro) {
        console.error('Erro ao listar usuários:', erro);
        res.status(500).json({ error: 'Erro ao listar usuários no banco de dados.' });
    }
};

export { criarUsuario, listarUsuarios };