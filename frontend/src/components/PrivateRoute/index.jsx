import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PrivateRoute = ({ children, cargo }) => {
  const { usuario, carregando } = useAuth()

  if (carregando) {
    return <div>Carregando...</div>
  }

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  if (cargo && usuario.role !== cargo) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PrivateRoute