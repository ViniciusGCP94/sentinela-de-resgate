import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginService } from '../services/authService'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario')
    const token = localStorage.getItem('token')

    if (usuarioSalvo && token) {
      setUsuario(JSON.parse(usuarioSalvo))
    }

    setCarregando(false)
  }, [])

  const login = async (email, senha) => {
    const dados = await loginService(email, senha)

    localStorage.setItem('token', dados.token)
    localStorage.setItem('usuario', JSON.stringify(dados.user))

    setUsuario(dados.user)
    return dados.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  const isAcs = usuario?.role === 'acs'
  const isDefesaCivil = usuario?.role === 'defesa_civil'

  return (
    <AuthContext.Provider value={{ usuario, login, logout, carregando, isAcs, isDefesaCivil }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }