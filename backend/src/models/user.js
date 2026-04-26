import pool from '../config/database.js';

const criarUsuario = async (nome, email, senhaHash, role) => {
    const res = await pool.query(`
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role`,
        [nome, email, senhaHash, role]
    );
    return res.rows[0];
}

const buscarUsuarioPorEmail = async (email) => {
    const res = await pool.query(`
        SELECT * FROM users WHERE email = $1`, 
        [email]
    );
    return res.rows[0];
}

const buscarUsuarioPorId = async (id) => {
    const res = await pool.query(`
        SELECT id, name, email, role FROM users WHERE id = $1`, 
        [id]
    );
    return res.rows[0];
}

const buscarTodosUsuarios = async () => {
    const res = await pool.query(`
        SELECT id, name, email, role FROM users ORDER BY id ASC`
    );
    return res.rows;
}

export {
    criarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId,
    buscarTodosUsuarios
};