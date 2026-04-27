import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import './styles/global.scss'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<div>Login — em breve</div>} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout titulo="Painel">
                {/* Espaço reservado para os componentes da Etapa 4 */}
                <div>Dashboard — em breve</div>
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App