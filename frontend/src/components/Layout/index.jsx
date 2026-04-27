import Header from '../Header'
import Sidebar from '../Sidebar'

const Layout = ({ children, titulo }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__conteudo">
        <Header titulo={titulo} />
        <main className="layout__pagina">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout