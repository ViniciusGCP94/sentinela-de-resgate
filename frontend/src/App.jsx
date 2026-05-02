import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pessoas from './pages/Pessoas'
import NovaPessoa from './pages/NovaPessoa'
import DetalhesPessoa from './pages/DetalhesPessoa'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />

          <Route path="/pessoas" element={
            <PrivateRoute><Pessoas /></PrivateRoute>
          } />

          <Route path="/pessoas/nova" element={
            <PrivateRoute cargo="acs"><NovaPessoa /></PrivateRoute>
          } />

          <Route path="/pessoas/:id" element={
            <PrivateRoute><DetalhesPessoa /></PrivateRoute>
          } />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App