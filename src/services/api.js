import axios from 'axios'

const API_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Note: This app uses localStorage for session persistence.
// For a production app, you'd want to implement JWT tokens here.

export const signup = async (userData) => {
  const response = await api.post('/signup', userData)
  localStorage.setItem('user', JSON.stringify(response.data))
  return response.data
}

export const login = async (credentials) => {
  const response = await api.post('/login', credentials)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  return response.data
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
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
  const response = await api.put(`/songs/${id}`, songData)
  return response.data
}

export const deleteSong = async (id) => {
  const response = await api.delete(`/songs/${id}`)
  return response.data
}

export default api
