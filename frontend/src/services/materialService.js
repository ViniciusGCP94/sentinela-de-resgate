import api from './api'

const listarPorPessoa = async (personId) => {
  const { data } = await api.get(`/materiais/${personId}`)
  return data
}

const adicionar = async (personId, material) => {
  const { data } = await api.post('/materiais', { person_id: personId, ...material })
  return data
}

const marcarAtendida = async (id) => {
  const { data } = await api.patch(`/materiais/${id}/atender`)
  return data
}

const remover = async (id) => {
  const { data } = await api.delete(`/materiais/${id}`)
  return data
}

export { listarPorPessoa, adicionar, marcarAtendida, remover }