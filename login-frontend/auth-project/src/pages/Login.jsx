import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await axios.post('http://localhost:5000/api/auth/login', formData, {
        withCredentials: true
      })
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="waves-bg">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>
      <div className="page-wrapper">
        <div className="card">
          <h2 style={{ fontFamily: 'Space Mono', color: '#e2e8f0', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Welcome back
          </h2>
          <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Sign in to your account</p>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="input-field" />
            </div>
            <div>
              <label className="label">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '1.25rem', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0e7490', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login