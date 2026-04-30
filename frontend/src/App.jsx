import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Importação das páginas reais
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pessoas from './pages/Pessoas'
import NovaPessoa from './pages/NovaPessoa' // Importação adicionada[cite: 2]

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/pessoas" element={
            <PrivateRoute>
              <Pessoas />
            </PrivateRoute>
          } />

          {/* Rota de novo cadastro restrita ao cargo ACS[cite: 2] */}
          <Route path="/pessoas/nova" element={
            <PrivateRoute cargo="acs">
              <NovaPessoa />
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App