import api from './api'

const listar = async (filtros = {}) => {
  const { data } = await api.get('/pessoas', { params: filtros })
  return data
}

const buscarPorId = async (id) => {
  const { data } = await api.get(`/pessoas/${id}`)
  return data
}

const criar = async (dadosPessoa) => {
  const { data } = await api.post('/pessoas', dadosPessoa)
  return data
}

const atualizarStatus = async (id, status) => {
  const { data } = await api.patch(`/pessoas/${id}/status`, { status })
  return data
}

export { listar, buscarPorId, criar, atualizarStatus }