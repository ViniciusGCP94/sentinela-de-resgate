import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.scss'

const menuAcs = [
  { caminho: '/dashboard', icone: '📊', label: 'Início' },
  { caminho: '/pessoas', icone: '👥', label: 'Pessoas Cadastradas' },
  { caminho: '/pessoas/nova', icone: '➕', label: 'Novo Cadastro' },
]

const menuDefesaCivil = [
  { caminho: '/dashboard', icone: '📊', label: 'Painel Geral' },
  { caminho: '/pessoas', icone: '👥', label: 'Todas as Pessoas' },
]

const Sidebar = () => {
  const { isAcs, isDefesaCivil } = useAuth()

  const itensMenu = isAcs ? menuAcs : isDefesaCivil ? menuDefesaCivil : []
  const labelCargo = isAcs ? 'Agente Comunitário' : 'Defesa Civil'

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoTitulo}>Sentinela de Resgate</div>
        <div className={styles.logoSubtitulo}>Governo do Estado — RS</div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.secaoTitulo}>{labelCargo}</div>
        {itensMenu.map((item) => (
          <NavLink
            key={item.caminho}
            to={item.caminho}
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.ativo : ''}`
            }
          >
            <span>{item.icone}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.rodape}>
        Sistema de Gestão de Vulneráveis © 2026
      </div>
    </aside>
  )
}

export default Sidebar