import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

// Importação das páginas reais
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pessoas from './pages/Pessoas'

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

          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App