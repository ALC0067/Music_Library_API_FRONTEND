import axios from 'axios'

const API_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const signup = async (userData) => {
  const response = await api.post('/signup', userData )
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

export const login = async (credentials) => {
  const response = await api.post('/login', credentials)
  if (response.data.token) {
    localStorage.setItem('token', response.data.token)
  }
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/me')
  return response.data
}

export const getSongs = async () => {
  const response = await api.get('/songs')
  return response.data
}

export const getSong = async (id) => {
  const response = await api.get(`/songs/${id}`)
  return response.data
}

export const createSong = async (songData) => {
  const response = await api.post('/songs', songData )
  return response.data
}

export const updateSong = async (id, songData) => {
  const response = await api.put(`/songs/${id}`, { song: songData })
  return response.data
}

export const deleteSong = async (id) => {
  const response = await api.delete(`/songs/${id}`)
  return response.data
}

export default api
