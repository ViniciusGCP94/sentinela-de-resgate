import bcrypt from 'bcryptjs';
import * as usuarioModel from '../models/user.js';

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, role } = req.body;
    
        const senhaHash = await bcrypt.hash(senha, 10);

        const resultado = await usuarioModel.criarUsuario(nome, email, senhaHash, role);
        
        res.status(201).json({
            mensagem: 'Usuário criado com sucesso!',
            usuario: resultado
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
             error: 'Erro ao criar o usuário'
        });
    }
}

const listarUsuarios = async (req, res) => {
    try {
        const resultado = await usuarioModel.listarUsuarios();
        res.status(200).json(resultado.rows);
    } catch (erro) {
        res.status(500).json({
            error: 'Erro ao buscar dados dos usuários'
        });
    }
}

export {
    criarUsuario,
    listarUsuarios
};