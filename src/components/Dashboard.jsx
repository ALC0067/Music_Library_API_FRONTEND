import React, { useState, useEffect } from 'react'
import { getSongs, deleteSong } from '../services/api'
import SongForm from './SongForm'
import SongList from './SongList'
import './Dashboard.css'

function Dashboard({ user, onLogout }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingSong, setEditingSong] = useState(null)

  useEffect(() => {
    loadSongs()
  }, [])

  const loadSongs = async () => {
    try {
      setLoading(true)
      const data = await getSongs()
      setSongs(data)
      setError('')
    } catch (err) {
      setError('Failed to load songs')
    } finally {
      setLoading(false)
    }
  }

  const handleSongAdded = () => {
    loadSongs()
    setShowForm(false)
    setEditingSong(null)
  }

  const handleEdit = (song) => {
    setEditingSong(song)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('DELETE THIS SONG?')) {
      try {
        await deleteSong(id)
        loadSongs()
      } catch (err) {
        setError('Failed to delete song')
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingSong(null)
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1>MUSIC LIBRARY</h1>
            <p className="user-name">LOGGED IN AS: {user.name.toUpperCase()}</p>
          </div>
          <button onClick={onLogout} className="danger">
            LOGOUT
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {error && <div className="error">{error}</div>}

        <div className="action-bar">
          <h2>YOUR SONGS ({songs.length})</h2>
          {!showForm && (
            <button onClick={() => setShowForm(true)}>
              + ADD NEW SONG
            </button>
          )}
        </div>

        {showForm && (
          <SongForm 
            song={editingSong}
            onSongAdded={handleSongAdded}
            onCancel={handleCancel}
          />
        )}

        {loading ? (
          <div className="loading-message">
            <h3>LOADING SONGS...</h3>
          </div>
        ) : (
          <SongList 
            songs={songs}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
