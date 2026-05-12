import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Header.module.scss'
 
const Header = ({ titulo, aoAbrirMenu }) => {
  const { usuario, logout, isAcs, isDefesaCivil } = useAuth()
  const navigate = useNavigate()
 
  const aoSair = () => {
    logout()
    navigate('/login')
  }
 
  const labelCargo = isAcs ? 'ACS' : isDefesaCivil ? 'Defesa Civil' : ''
 
  return (
    <header className={styles.header}>
      <div className={styles.esquerda}>
        <button className={styles.btnMenu} onClick={aoAbrirMenu} aria-label="Abrir menu">
          ☰
        </button>
        <span className={styles.titulo}>{titulo}</span>
      </div>
 
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