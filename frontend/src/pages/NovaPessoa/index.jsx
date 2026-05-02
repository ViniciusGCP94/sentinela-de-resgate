import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import { criar } from '../../services/pessoaService'
import styles from './NovaPessoa.module.scss'

const ESTADO_INICIAL = {
  name: '',
  cpf: '',
  birth_date: '',
  phone: '',
  address: '',
  neighborhood: '',
  city: 'Santa Cruz do Sul',
  zip_code: '',
  needs_vital_equipment: false,
  vital_equipment_description: '',
  family_contact_name: '',
  family_contact_phone: '',
  consent: false,
}

const NovaPessoa = () => {
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const aoMudar = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const aoSubmeter = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const resposta = await criar(form)
      navigate(`/pessoas/${resposta.pessoa.id}`)
    } catch (erro) {
      const mensagem = erro.response?.data?.error || 'Erro ao cadastrar. Tente novamente.'
      setErro(mensagem)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Layout titulo="Novo Cadastro">
      <h1 className="titulo-pagina">Cadastrar Pessoa</h1>
      <p className="subtitulo-pagina">Preencha os dados da pessoa em situação de vulnerabilidade</p>

      {erro && (
        <div style={{ 
          background: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: '6px', 
          padding: '12px 16px', 
          color: '#c00', 
          marginBottom: '16px', 
          fontSize: '14px' 
        }}>
          {erro}
        </div>
      )}

      <form onSubmit={aoSubmeter}>
        <div className={styles.secao}>
          <h2 className={styles.secaoTitulo}>👤 Dados Pessoais</h2>
          <div className="grid-form grid-form--2">
            <div className="campo">
              <label className="campo__label">Nome completo *</label>
              <input name="name" className="campo__input" value={form.name}
                onChange={aoMudar} required placeholder="Nome da pessoa" />
            </div>
            <div className="campo">
              <label className="campo__label">CPF</label>
              <input name="cpf" className="campo__input" value={form.cpf}
                onChange={aoMudar} placeholder="000.000.000-00" />
            </div>
            <div className="campo">
              <label className="campo__label">Data de nascimento</label>
              <input name="birth_date" type="date" className="campo__input"
                value={form.birth_date} onChange={aoMudar} />
            </div>
            <div className="campo">
              <label className="campo__label">Telefone</label>
              <input name="phone" className="campo__input" value={form.phone}
                onChange={aoMudar} placeholder="(51) 99999-9999" />
            </div>
          </div>
        </div>

        <div className={styles.secao}>
          <h2 className={styles.secaoTitulo}>📍 Endereço</h2>
          <div className="grid-form grid-form--2">
            <div className="campo">
              <label className="campo__label">Endereço *</label>
              <input name="address" className="campo__input" value={form.address}
                onChange={aoMudar} required placeholder="Rua, número" />
            </div>
            <div className="campo">
              <label className="campo__label">Bairro *</label>
              <input name="neighborhood" className="campo__input" value={form.neighborhood}
                onChange={aoMudar} required placeholder="Nome do bairro" />
            </div>
            <div className="campo">
              <label className="campo__label">Cidade *</label>
              <input name="city" className="campo__input" value={form.city}
                onChange={aoMudar} required />
            </div>
            <div className="campo">
              <label className="campo__label">CEP</label>
              <input name="zip_code" className="campo__input" value={form.zip_code}
                onChange={aoMudar} placeholder="00000-000" />
            </div>
          </div>
        </div>

        <div className={styles.secao}>
          <h2 className={styles.secaoTitulo}>📞 Contato Familiar</h2>
          <p style={{ fontSize: '13px', color: '#868e96', marginBottom: '16px' }}>
            Usado pela Defesa Civil para localizar a pessoa em caso de desaparecimento.
          </p>
          <div className="grid-form grid-form--2">
            <div className="campo">
              <label className="campo__label">Nome do familiar</label>
              <input name="family_contact_name" className="campo__input"
                value={form.family_contact_name} onChange={aoMudar}
                placeholder="Nome do contato" />
            </div>
            <div className="campo">
              <label className="campo__label">Telefone do familiar</label>
              <input name="family_contact_phone" className="campo__input"
                value={form.family_contact_phone} onChange={aoMudar}
                placeholder="(51) 99999-9999" />
            </div>
          </div>
        </div>

        <div className={styles.secao}>
          <h2 className={styles.secaoTitulo}>⚠️ Necessidades Especiais</h2>
          <div className="campo">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" name="needs_vital_equipment"
                checked={form.needs_vital_equipment} onChange={aoMudar} />
              <span className="campo__label" style={{ margin: 0 }}>
                Depende de equipamento vital (oxigênio, bomba de insulina, etc.)
              </span>
            </label>
          </div>
          {form.needs_vital_equipment && (
            <div className="campo">
              <label className="campo__label">Descreva o equipamento</label>
              <input name="vital_equipment_description" className="campo__input"
                value={form.vital_equipment_description} onChange={aoMudar}
                placeholder="Ex: Concentrador de oxigênio 5L/min" />
            </div>
          )}
        </div>

        <div className={styles.secao}>
          <div className={styles.checkboxLgpd}>
            <input type="checkbox" id="consent" name="consent"
              checked={form.consent} onChange={aoMudar} required />
            <label htmlFor="consent">
              Declaro que a pessoa cadastrada <strong>consentiu com o armazenamento de seus dados</strong> para fins de assistência em situações de emergência, conforme a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
            </label>
          </div>
        </div>

        <div className={styles.rodapeForm}>
          <button type="button" className="btn btn--secundario"
            onClick={() => navigate('/pessoas')}>
            Cancelar
          </button>
          <button type="submit" className="btn btn--primario"
            disabled={!form.consent || carregando}>
            {carregando ? 'Salvando...' : '✓ Cadastrar Pessoa'}
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default NovaPessoa