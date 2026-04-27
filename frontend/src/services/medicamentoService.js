import api from './api'

const listarPorPessoa = async (personId) => {
  const { data } = await api.get(`/medicamentos/${personId}`)
  return data
}

const adicionar = async (personId, medicamento) => {
  const { data } = await api.post('/medicamentos', { person_id: personId, ...medicamento })
  return data
}

const remover = async (id) => {
  const { data } = await api.delete(`/medicamentos/${id}`)
  return data
}

export { listarPorPessoa, adicionar, remover }