import Sidebar from '../Sidebar'
import Header from '../Header'
import styles from './Layout.module.scss'

const Layout = ({ children, titulo }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.conteudoPrincipal}>
        <Header titulo={titulo} />
        <main className={styles.view}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout