import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as usuarioModel from '../models/user.js';

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
            { expiresIn: '1h' }
        );

        res.json({ 
            token,
            user: { id: usuario.id, nome: usuario.name, role: usuario.role }
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
}

export { login };