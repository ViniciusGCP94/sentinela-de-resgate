import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.scss'

const Header = ({ titulo }) => {
  const { usuario, logout, ehAcs, ehDefesaCivil } = useAuth()
  const navigate = useNavigate()

  const aoSair = () => {
    logout()
    navigate('/login')
  }

  const labelCargo = ehAcs ? 'ACS' : ehDefesaCivil ? 'Defesa Civil' : ''

  return (
    <header className={styles.header}>
      <span className={styles.titulo}>{titulo}</span>

      <div className={styles.usuario}>
        <span className={styles.nomeUsuario}>{usuario?.nome}</span>
        <span className={styles.cargo}>{labelCargo}</span>
        <button className={styles.btnLogout} onClick={aoSair}>
          Sair
        </button>
      </div>
    </header>
  )
}

export default Header