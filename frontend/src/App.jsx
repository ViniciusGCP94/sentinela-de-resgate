import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import Login from './pages/Login' 
const Dashboard = () => <div>Painel de Monitoramento — Em breve</div>

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <Layout titulo="Dashboard">
                <Dashboard />
              </Layout>
            </PrivateRoute>
          } />

          <Route path="/pessoas" element={
            <PrivateRoute>
              <Layout titulo="Pessoas Cadastradas">
                <div>Pessoas — em breve</div>
              </Layout>
            </PrivateRoute>
          } />

          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App