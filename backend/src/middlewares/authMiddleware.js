import jwt from 'jsonwebtoken';

const autenticar = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const partes = authHeader.split(' ');

    if (partes.length !== 2) {
        return res.status(401).json({ error: 'Erro no formato do token.' });
    }

    const [ esquema, token ] = partes;

    if (!/^Bearer$/i.test(esquema)) {
        return res.status(401).json({ error: 'Token malformatado.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.usuario = {
            id: decoded.id,
            role: decoded.role
        };
        
        next();
    } catch (erro) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
};

const autorizar = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario || !rolesPermitidos.includes(req.usuario.role)) {
            return res.status(403).json({ 
                error: 'Acesso negado. Você não tem permissão para realizar esta ação.' 
            });
        }
        next();
    };
};

export { autenticar, autorizar };