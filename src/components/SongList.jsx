import React from 'react'
import './SongList.css'

function SongList({ songs, onEdit, onDelete }) {
  if (songs.length === 0) {
    return (
      <div className="empty-state">
        <h3>NO SONGS YET</h3>
        <p>ADD YOUR FIRST SONG TO GET STARTED</p>
      </div>
    )
  }

  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <div key={song.id} className="song-card" style={{
          transform: `rotate(${index % 2 === 0 ? '-1deg' : '1deg'})`
        }}>
          <div className="song-info">
            <h3 className="song-title">{song.title}</h3>
            <p className="song-artist">BY: {song.artist}</p>
            {song.album && <p className="song-album">ALBUM: {song.album}</p>}
          </div>
          <div className="song-actions">
            <button onClick={() => onEdit(song)} className="secondary">
              EDIT
            </button>
            <button onClick={() => onDelete(song.id)} className="danger">
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SongList
