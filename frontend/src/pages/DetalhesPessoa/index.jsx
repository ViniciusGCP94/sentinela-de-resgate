import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import StatusBadge from '../../components/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { buscarPorId, atualizarStatus } from '../../services/pessoaService'
import { listarPorPessoa as listarMeds, adicionar as adicionarMed, remover as removerMed } from '../../services/medicamentoService'
import { listarPorPessoa as listarMats, adicionar as adicionarMat, marcarAtendida, remover as removerMat } from '../../services/materialService'
import styles from './DetalhesPessoa.module.scss'

const DetalhesPessoa = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ehAcs, ehDefesaCivil } = useAuth()

  const [pessoa, setPessoa] = useState(null)
  const [medicamentos, setMedicamentos] = useState([])
  const [materiais, setMateriais] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [novoStatus, setNovoStatus] = useState('')

  const [novoMed, setNovoMed] = useState({ nome: '', dosagem: '', frequencia: '' })
  const [novoMat, setNovoMat] = useState({ categoria: '', descricao: '' })

  const carregarDados = async () => {
    try {
      const [dadosPessoa, dadosMeds, dadosMats] = await Promise.all([
        buscarPorId(id),
        listarMeds(id),
        listarMats(id),
      ])
      setPessoa(dadosPessoa)
      setNovoStatus(dadosPessoa.status)
      setMedicamentos(dadosMeds)
      setMateriais(dadosMats)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { carregarDados() }, [id])

  const aoAtualizarStatus = async () => {
    try {
      await atualizarStatus(id, novoStatus)
      await carregarDados()
    } catch (err) {
      console.error('Erro ao atualizar status:', err)
    }
  }

  const aoAdicionarMed = async (e) => {
    e.preventDefault()
    try {
      await adicionarMed(id, novoMed)
      setNovoMed({ nome: '', dosagem: '', frequencia: '' })
      await carregarDados()
    } catch (err) {
      console.error('Erro ao adicionar medicamento:', err)
    }
  }

  const aoAdicionarMat = async (e) => {
    e.preventDefault()
    try {
      await adicionarMat(id, novoMat)
      setNovoMat({ categoria: '', descricao: '' })
      await carregarDados()
    } catch (err) {
      console.error('Erro ao adicionar material:', err)
    }
  }


  if (carregando) return <Layout titulo="Detalhes"><div className="carregando">Carregando...</div></Layout>
  if (!pessoa) return <Layout titulo="Não encontrado"><div className="estado-vazio">Pessoa não encontrada.</div></Layout>

  return (
    <Layout titulo={pessoa.name}>
      <button onClick={() => navigate('/pessoas')} className="btn btn--secundario" style={{ marginBottom: '16px' }}>
        ← Voltar
      </button>

      <div className={styles.cabecalho}>
        <div>
          <div className={styles.nomePessoa}>{pessoa.name}</div>
          <StatusBadge status={pessoa.status} />

          <div className={styles.infos}>
            {pessoa.cpf && <div className={styles.infoItem}><strong>CPF</strong>{pessoa.cpf}</div>}
            {pessoa.birth_date && (
              <div className={styles.infoItem}>
                <strong>Nascimento</strong>
                {new Date(pessoa.birth_date).toLocaleDateString('pt-BR')}
              </div>
            )}
            {pessoa.phone && <div className={styles.infoItem}><strong>Telefone</strong>{pessoa.phone}</div>}
            <div className={styles.infoItem}><strong>Bairro</strong>{pessoa.neighborhood}</div>
            <div className={styles.infoItem}><strong>Endereço</strong>{pessoa.address}</div>
            {pessoa.family_contact_name && (
              <div className={styles.infoItem}>
                <strong>Familiar</strong>
                {pessoa.family_contact_name} — {pessoa.family_contact_phone}
              </div>
            )}
          </div>
        </div>

        {ehDefesaCivil && (
          <div className={styles.atualizarStatus}>
            <select className="campo__select" value={novoStatus}
              onChange={(e) => setNovoStatus(e.target.value)}>
              <option value="em_casa">Em Casa</option>
              <option value="resgatada">Resgatada</option>
              <option value="em_abrigo">Em Abrigo</option>
              <option value="nao_localizada">Não Localizada</option>
            </select>
            <button className="btn btn--primario" onClick={aoAtualizarStatus}>
              Atualizar
            </button>
          </div>
        )}
      </div>

      {pessoa.needs_vital_equipment && (
        <div className={styles.alertaVital}>
          ⚠️ EQUIPAMENTO VITAL: {pessoa.vital_equipment_description}
        </div>
      )}

      <div className={styles.grid}>
        <div className={styles.secao}>
          <div className={styles.secaoHeader}>
            <span className={styles.secaoTitulo}>💊 Medicamentos</span>
          </div>

          {medicamentos.length === 0
            ? <p style={{ fontSize: '13px', color: '#adb5bd' }}>Nenhum medicamento cadastrado.</p>
            : medicamentos.map((med) => (
              <div key={med.id} className={styles.itemLista}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemNome}>{med.name}</div>
                  <div className={styles.itemDetalhe}>{med.dosage} — {med.frequency}</div>
                </div>
                {ehAcs && (
                  <button className="btn btn--perigo btn--sm"
                    onClick={async () => { await removerMed(med.id); carregarDados() }}>
                    ✕
                  </button>
                )}
              </div>
            ))
          }

          {ehAcs && (
            <form onSubmit={aoAdicionarMed} className={styles.formInline}>
              <input className="campo__input" placeholder="Medicamento" required
                value={novoMed.nome} onChange={(e) => setNovoMed(p => ({ ...p, nome: e.target.value }))} />
              <input className="campo__input" placeholder="Dosagem"
                value={novoMed.dosagem} onChange={(e) => setNovoMed(p => ({ ...p, dosagem: e.target.value }))} />
              <input className="campo__input" placeholder="Frequência"
                value={novoMed.frequencia} onChange={(e) => setNovoMed(p => ({ ...p, frequencia: e.target.value }))} />
              <button type="submit" className="btn btn--primario btn--sm">+ Adicionar</button>
            </form>
          )}
        </div>

        <div className={styles.secao}>
          <div className={styles.secaoHeader}>
            <span className={styles.secaoTitulo}>📦 Necessidades Materiais</span>
          </div>

          {materiais.length === 0
            ? <p style={{ fontSize: '13px', color: '#adb5bd' }}>Nenhuma necessidade cadastrada.</p>
            : materiais.map((mat) => (
              <div key={mat.id} className={styles.itemLista}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemNome}>{mat.category}</div>
                  <div className={styles.itemDetalhe}>{mat.description}</div>
                  {mat.fulfilled && <div className={styles.itemAtendido}>✓ Atendida</div>}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {ehDefesaCivil && !mat.fulfilled && (
                    <button className="btn btn--primario btn--sm"
                      onClick={async () => { await marcarAtendida(mat.id); carregarDados() }}>
                      ✓
                    </button>
                  )}
                  {ehAcs && (
                    <button className="btn btn--perigo btn--sm"
                      onClick={async () => { await removerMat(mat.id); carregarDados() }}>
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))
          }

          {ehAcs && (
            <form onSubmit={aoAdicionarMat} className={styles.formInline}>
              <select className="campo__select" required
                value={novoMat.categoria}
                onChange={(e) => setNovoMat(p => ({ ...p, categoria: e.target.value }))}>
                <option value="">Categoria</option>
                <option value="roupa">Roupa</option>
                <option value="cobertor">Cobertor</option>
                <option value="colchao">Colchão</option>
                <option value="alimento">Alimento</option>
                <option value="higiene">Higiene</option>
                <option value="outro">Outro</option>
              </select>
              <input className="campo__input" placeholder="Descrição"
                value={novoMat.descricao}
                onChange={(e) => setNovoMat(p => ({ ...p, descricao: e.target.value }))} />
              <button type="submit" className="btn btn--primario btn--sm">+ Adicionar</button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default DetalhesPessoa