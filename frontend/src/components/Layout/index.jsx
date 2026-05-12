import { useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'

const Layout = ({ children, titulo }) => {
  const [menuAberto, setMenuAberto] = useState(false)
 
  return (
    <div className="layout">
      <Sidebar menuAberto={menuAberto} aoFechar={() => setMenuAberto(false)} />
      {menuAberto && (
        <div className="layout__overlay" onClick={() => setMenuAberto(false)} />
      )}
      <div className="layout__conteudo">
        <Header titulo={titulo} aoAbrirMenu={() => setMenuAberto(true)} />
        <main className="layout__pagina">
          {children}
        </main>
      </div>
    </div>
  )
}
 
export default Layout