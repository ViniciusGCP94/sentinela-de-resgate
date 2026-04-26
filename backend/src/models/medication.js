import pool from '../config/database.js';

const registrarMedicamento = async (person_id, nome, dosagem, frequencia) => {
    const res = await pool.query(
        `INSERT INTO medications (person_id, name, dosage, frequency)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [person_id, nome, dosagem, frequencia]
    );
    return res.rows[0];
};

const buscarMedicamentosPorPessoa = async (person_id) => {
    const res = await pool.query(
        `SELECT * FROM medications WHERE person_id = $1`,
        [person_id]
    );
    return res.rows;
};

const deletarMedicamento = async (id) => {
    await pool.query(
        `DELETE FROM medications WHERE id = $1`,
        [id]
    );
};

export { registrarMedicamento, buscarMedicamentosPorPessoa, deletarMedicamento };