import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as usuarioModel from '../models/user.js';

// Função de Login (Já existente no seu arquivo)
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
        
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.password);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha inválida' });
        }
             
        const token = jwt.sign(
            { id: usuario.id, role: usuario.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '8h' }
        );

        res.json({ 
            token,
            user: { id: usuario.id, nome: usuario.name, role: usuario.role }
        });
    } catch (erro) {
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
}

// Função de Registro (Nova para fechar a Etapa 5)
const registrar = async (req, res) => {
    try {
        const { nome, email, senha, cargo } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
        }

        const usuarioExistente = await usuarioModel.buscarUsuarioPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const novoUsuario = await usuarioModel.criarUsuario(nome, email, senhaHash, cargo);

        res.status(201).json({
            mensagem: 'Usuário registrado com sucesso!',
            usuario: novoUsuario
        });
    } catch (erro) {
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
};

export { login, registrar };