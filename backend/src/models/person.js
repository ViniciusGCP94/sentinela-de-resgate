import pool from '../config/database.js';

const listarPessoas = async (filtros, usuario) => {
    let query = 'SELECT * FROM persons';
    const values = [];
    const condicoes = [];

    if (usuario.role === 'acs') {
        condicoes.push('registered_by = $' + (values.length + 1));
        values.push(usuario.id);
    }

    if (filtros.neighborhood) {
        condicoes.push('neighborhood = $' + (values.length + 1));
        values.push(filtros.neighborhood);
    }

    if (filtros.status) {
        condicoes.push('status = $' + (values.length + 1));
        values.push(filtros.status);
    }

    if (condicoes.length > 0) {
        query += ' WHERE ' + condicoes.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';
    const res = await pool.query(query, values);
    return res.rows;
};

const criarPessoa = async (data, acsId) => {
    const { 
        name, cpf, birth_date, phone, address, neighborhood, 
        city, zip_code, needs_vital_equipment, 
        vital_equipment_description, family_contact_name, 
        family_contact_phone, consent 
    } = data;

    const query = `
        INSERT INTO persons (
            name, cpf, birth_date, phone, address, neighborhood, 
            city, zip_code, needs_vital_equipment, 
            vital_equipment_description, family_contact_name, 
            family_contact_phone, consent, registered_by
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *;
    `;

    const values = [
        name, cpf, birth_date, phone, address, neighborhood, 
        city, zip_code, needs_vital_equipment, 
        vital_equipment_description, family_contact_name, 
        family_contact_phone, consent, acsId
    ];

    const res = await pool.query(query, values);
    return res.rows[0];
};

const atualizarStatus = async (id, status) => {
    const res = await pool.query(
        'UPDATE persons SET status = $1, updated_at = now() WHERE id = $2 RETURNING *',
        [status, id]
    );
    return res.rows[0];
};

export { listarPessoas, criarPessoa, atualizarStatus };