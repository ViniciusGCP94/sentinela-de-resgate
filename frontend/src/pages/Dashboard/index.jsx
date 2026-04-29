import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'
import { listar } from '../../services/pessoaService'
import styles from './Dashboard.module.scss'

const contarPorStatus = (pessoas) => ({
  total: pessoas.length,
  resgatada: pessoas.filter(p => p.status === 'resgatada').length,
  em_abrigo: pessoas.filter(p => p.status === 'em_abrigo').length,
  nao_localizada: pessoas.filter(p => p.status === 'nao_localizada').length,
})

const Dashboard = () => {
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const { ehAcs } = useAuth()

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const dados = await listar()
        setPessoas(dados)
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err)
      } finally {
        setCarregando(false)
      }
    }

    buscarDados()
  }, [])

  const contagem = contarPorStatus(pessoas)

  if (carregando) {
    return (
      <Layout titulo="Painel de Controle">
        <p>Carregando dados...</p>
      </Layout>
    )
  }

  return (
    <Layout titulo="Painel de Controle">
      <h1>Painel de Controle</h1>
      <p style={{ color: '#868e96', marginBottom: '24px' }}>
        Visão geral das pessoas cadastradas
      </p>

      <div className={styles.cards}>
        <div className={`${styles.card} ${styles['card--total']}`}>
          <div className={styles.cardNumero}>{contagem.total}</div>
          <div className={styles.cardLabel}>Total cadastrado</div>
        </div>
        <div className={`${styles.card} ${styles['card--resgatada']}`}>
          <div className={styles.cardNumero}>{contagem.resgatada}</div>
          <div className={styles.cardLabel}>Resgatadas</div>
        </div>
        <div className={`${styles.card} ${styles['card--abrigo']}`}>
          <div className={styles.cardNumero}>{contagem.em_abrigo}</div>
          <div className={styles.cardLabel}>Em abrigo</div>
        </div>
        <div className={`${styles.card} ${styles['card--naoLocalizada']}`}>
          <div className={styles.cardNumero}>{contagem.nao_localizada}</div>
          <div className={styles.cardLabel}>Não localizadas</div>
        </div>
      </div>

      {ehAcs && (
        <Link to="/pessoas/nova" className={styles.linkNovo}>
          ➕ Cadastrar nova pessoa
        </Link>
      )}
    </Layout>
  )
}

export default Dashboard