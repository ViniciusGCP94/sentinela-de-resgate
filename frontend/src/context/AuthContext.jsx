import { createContext, useContext, useState } from 'react'
import { login as loginService } from '../services/authService'

const AuthContext = createContext(null)


const lerUsuarioSalvo = () => {
  try {
    const usuarioSalvo = localStorage.getItem('usuario')
    const token = localStorage.getItem('token')

    if (usuarioSalvo && token) {
      return JSON.parse(usuarioSalvo)
    }
  } catch {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  }
  return null
}

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(lerUsuarioSalvo)
  const [carregando, setCarregando] = useState(false)

  const login = async (email, senha) => {
    setCarregando(true)
    try {
      const dados = await loginService(email, senha)
      localStorage.setItem('token', dados.token)
      localStorage.setItem('usuario', JSON.stringify(dados.user))
      setUsuario(dados.user)
      return dados.user
    } catch (error) {
      console.error('Erro ao realizar login:', error)
      throw error
    } finally {
      setCarregando(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  const isAcs = usuario?.role === 'acs'
  const isDefesaCivil = usuario?.role === 'defesa_civil'

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        carregando,
        isAcs,
        isDefesaCivil,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}