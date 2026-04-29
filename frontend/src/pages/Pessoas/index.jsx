import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import StatusBadge from '../../components/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { listar } from '../../services/pessoaService'
import styles from './Pessoas.module.scss'

const Pessoas = () => {
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [bairro, setBairro] = useState('')
  const [status, setStatus] = useState('')
  const { ehAcs } = useAuth()

  const buscarPessoas = useCallback(async (filtros = {}) => {
    setCarregando(true)
    try {
      const dados = await listar(filtros)
      setPessoas(dados)
    } catch (erro) {
      console.error('Erro ao buscar pessoas:', erro)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    buscarPessoas()
  }, [buscarPessoas])

  const aoFiltrar = (e) => {
    e.preventDefault()
    const filtros = {}
    if (bairro) filtros.neighborhood = bairro
    if (status) filtros.status = status
    buscarPessoas(filtros)
  }

  const aoLimpar = () => {
    setBairro('')
    setStatus('')
    buscarPessoas()
  }

  return (
    <Layout titulo="Pessoas Cadastradas">
      <div className={styles.cabecalho}>
        <div>
          <h1 className={styles.tituloPagina}>Pessoas Cadastradas</h1>
          <p className={styles.subtitulo}>{pessoas.length} pessoa(s) encontrada(s)</p>
        </div>
        {ehAcs && (
          <Link to="/pessoas/nova" className={styles.btnNovo}>
            ➕ Nova pessoa
          </Link>
        )}
      </div>

      <form className={styles.filtros} onSubmit={aoFiltrar}>
        <div>
          <label className={styles.label}>Bairro</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Ex: Centro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>

        <div>
          <label className={styles.label}>Status</label>
          <select
            className={styles.select}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="em_casa">Em Casa</option>
            <option value="resgatada">Resgatada</option>
            <option value="em_abrigo">Em Abrigo</option>
            <option value="nao_localizada">Não Localizada</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
          <button type="submit" className={styles.btnFiltrar}>
            🔍 Filtrar
          </button>
          <button type="button" className={styles.btnLimpar} onClick={aoLimpar}>
            Limpar
          </button>
        </div>
      </form>

      {carregando ? (
        <p>Buscando pessoas...</p>
      ) : pessoas.length === 0 ? (
        <div className={styles.estadoVazio}>
          Nenhuma pessoa encontrada com os filtros aplicados.
        </div>
      ) : (
        <div className={styles.tabelaContainer}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Bairro</th>
                <th>Status</th>
                <th>Equip. Vital</th>
                <th>Contato Familiar</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{pessoa.name}</td>
                  <td>{pessoa.neighborhood}</td>
                  <td><StatusBadge status={pessoa.status} /></td>
                  <td>
                    {pessoa.needs_vital_equipment
                      ? <span className={styles.equipamentoVital}>⚠️ Sim</span>
                      : 'Não'}
                  </td>
                  <td>{pessoa.family_contact_phone || '—'}</td>
                  <td>
                    <Link to={`/pessoas/${pessoa.id}`} className={styles.linkDetalhe}>
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  )
}

export default Pessoas