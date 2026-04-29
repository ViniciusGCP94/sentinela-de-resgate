import Sidebar from '../Sidebar'
import Header from '../Header'

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