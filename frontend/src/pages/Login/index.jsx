import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Login.module.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const aoSubmeter = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const usuario = await login(email, senha)

      if (usuario.role === 'acs') {
        navigate('/pessoas')
      } else {
        navigate('/dashboard')
      }
    } catch (erro) {
      const mensagem = erro.response?.data?.error || 'Erro ao realizar login. Tente novamente.'
      setErro(mensagem)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.banner}>
        <div className={styles.bannerLogo}>🛡️</div>
        <h1 className={styles.bannerTitulo}>
          Sentinela<br />de Resgate
        </h1>
        <p className={styles.bannerSubtitulo}>
          Sistema de gestão de pessoas vulneráveis em situações de emergência no Rio Grande do Sul.
        </p>
        <span className={styles.bannerRodape}>
          Governo do Estado do Rio Grande do Sul
        </span>
      </div>

      <div className={styles.formulario}>
        <div className={styles.caixa}>
          <div className={styles.cabecalho}>
            <h2 className={styles.tituloCabecalho}>Acesso ao Sistema</h2>
            <p className={styles.subtituloCabecalho}>Restrito a agentes autorizados</p>
          </div>

          {erro && <div className={styles.erro}>{erro}</div>}

          <form onSubmit={aoSubmeter}>
            <div className={styles.campo}>
              <label className={styles.label} htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label} htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                className={styles.input}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className={styles.btnEntrar}
              disabled={carregando}
            >
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className={styles.rodapePagina}>
            Problemas de acesso? Contate o administrador do sistema.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login