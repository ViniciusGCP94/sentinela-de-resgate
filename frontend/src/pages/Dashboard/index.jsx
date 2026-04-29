import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'
import { listar } from '../../services/pessoaService'
import styles from './Dashboard.module.scss'

const contarPorStatus = (pessoas) => ({
  total: pessoas.length,
  resgatada: pessoas.filter(p => p.status === 'resgatada').length,
  emAbrigo: pessoas.filter(p => p.status === 'emAbrigo').length,
  naoLocalizada: pessoas.filter(p => p.status === 'naoLocalizada').length,
})

const Dashboard = () => {
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const { isAcs } = useAuth()

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
        <div className={`${styles.card} ${styles['cardTotal']}`}>
          <div className={styles.cardNumero}>{contagem.total}</div>
          <div className={styles.cardLabel}>Total cadastrado</div>
        </div>
        <div className={`${styles.card} ${styles['cardResgatada']}`}>
          <div className={styles.cardNumero}>{contagem.resgatada}</div>
          <div className={styles.cardLabel}>Resgatadas</div>
        </div>
        <div className={`${styles.card} ${styles['cardEmAbrigo']}`}>
          <div className={styles.cardNumero}>{contagem.emAbrigo}</div>
          <div className={styles.cardLabel}>Em abrigo</div>
        </div>
        <div className={`${styles.card} ${styles['cardNaoLocalizada']}`}>
          <div className={styles.cardNumero}>{contagem.naoLocalizada}</div>
          <div className={styles.cardLabel}>Não localizadas</div>
        </div>
      </div>

      {isAcs && (
        <Link to="/pessoas/nova" className={styles.linkNovo}>
          ➕ Cadastrar nova pessoa
        </Link>
      )}
    </Layout>
  )
}

export default Dashboard