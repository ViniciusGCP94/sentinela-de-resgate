import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query('SELECT NOW()', (erro, res) => {
  if (erro) {
    console.error('❌ Erro ao conectar no banco de dados:', erro.stack);
  } else {
    console.log('✅ Conexão com o PostgreSQL estabelecida com sucesso!');
  }
});

export default pool;