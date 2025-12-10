import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../services/api'
import './Auth.css'

function Signup({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const data = await signup({ 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      })
      onLogin(data.user)
    } catch (err) {
      const errorData = err.response?.data
      const errorMessage = errorData?.errors?.join(', ') || errorData?.error || 'Signup failed. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>MUSIC LIBRARY</h1>
          <h2>SIGN UP</h2>
        </div>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
            />
          </div>

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

          <div className="form-group">
            <label>CONFIRM PASSWORD</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>

        <div className="auth-footer">
          <p>ALREADY HAVE AN ACCOUNT?</p>
          <Link to="/login" className="auth-link">
            LOGIN HERE
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
