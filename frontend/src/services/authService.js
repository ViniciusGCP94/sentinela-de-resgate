import api from './api'

const login = async (email, senha) => {
  const { data } = await api.post('/auth/login', { email, senha })
  return data
}

const registro = async (nome, email, senha, cargo) => {
  const { data } = await api.post('/usuarios/registro', { nome, email, senha, cargo })
  return data
}

export { login, registro }