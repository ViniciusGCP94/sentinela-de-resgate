import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginService } from '../services/authService'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null) // Resetado para nulo
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario')
    const token = localStorage.getItem('token')

    if (usuarioSalvo && token) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
  }, [])

  const login = async (email, senha) => {
    try {
      const dados = await loginService(email, senha)
      localStorage.setItem('token', dados.token)
      localStorage.setItem('usuario', JSON.stringify(dados.user))
      setUsuario(dados.user)
      return dados.user
    } catch (error) {
      console.error("Erro ao realizar login:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  const ehAcs = usuario?.role === 'acs'
  const ehDefesaCivil = usuario?.role === 'defesa_civil'

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      login, 
      logout, 
      carregando, 
      ehAcs, 
      ehDefesaCivil 
    }}>
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