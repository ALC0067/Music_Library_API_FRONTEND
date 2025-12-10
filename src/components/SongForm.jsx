import React, { useState, useEffect } from 'react'
import { createSong, updateSong } from '../services/api'
import './SongForm.css'

function SongForm({ song, onSongAdded, onCancel }) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (song) {
      setTitle(song.title || '')
      setArtist(song.artist || '')
      setAlbum(song.album || '')
    }
  }, [song])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const songData = { title, artist, album }
      
      if (song) {
        await updateSong(song.id, songData)
      } else {
        await createSong(songData)
      }
      
      onSongAdded()
      setTitle('')
      setArtist('')
      setAlbum('')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save song')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="song-form-container">
      <div className="song-form-header">
        <h3>{song ? 'EDIT SONG' : 'ADD NEW SONG'}</h3>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="song-form">
        <div className="form-row">
          <div className="form-group">
            <label>TITLE *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Song Title"
            />
          </div>

          <div className="form-group">
            <label>ARTIST *</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
              placeholder="Artist Name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>ALBUM</label>
          <input
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="Album Name (Optional)"
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'SAVING...' : song ? 'UPDATE SONG' : 'ADD SONG'}
          </button>
          <button type="button" onClick={onCancel} className="secondary">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}

export default SongForm
