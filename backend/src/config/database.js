import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});

pool.query('SELECT NOW()', (erro, res) => {
  if (erro) {
    console.error('❌ Erro ao conectar no banco de dados:', erro.stack);
  } else {
    console.log('✅ Conexão com o PostgreSQL estabelecida com sucesso!');
  }
});

export default pool;