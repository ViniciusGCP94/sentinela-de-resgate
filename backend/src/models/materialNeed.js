import pool from '../config/database.js';

const registrarMaterial = async (person_id, categoria, descricao) => {
    const res = await pool.query(
        `INSERT INTO material_needs (person_id, category, description)
         VALUES ($1, $2, $3) RETURNING *`,
        [person_id, categoria, descricao]
    );
    return res.rows[0];
};

const buscarMateriaisPorPessoa = async (person_id) => {
    const res = await pool.query(
        `SELECT * FROM material_needs WHERE person_id = $1`,
        [person_id]
    );
    return res.rows;
};

const marcarAtendida = async (id) => {
    const res = await pool.query(
        `UPDATE material_needs SET fulfilled = true, fulfilled_at = now() 
         WHERE id = $1 RETURNING *`,
        [id]
    );
    return res.rows[0];
};

const deletarMaterial = async (id) => {
    await pool.query(
        `DELETE FROM material_needs WHERE id = $1`,
        [id]
    );
};

export { registrarMaterial, buscarMateriaisPorPessoa, marcarAtendida, deletarMaterial };