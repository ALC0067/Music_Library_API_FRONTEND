import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../services/api'
import './Auth.css'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login({ email, password })
      onLogin(data.user)
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>MUSIC LIBRARY</h1>
          <h2>LOGIN</h2>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <div className="auth-footer">
          <p>DON'T HAVE AN ACCOUNT?</p>
          <Link to="/signup" className="auth-link">
            SIGN UP HERE
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
