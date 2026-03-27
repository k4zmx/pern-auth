import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          withCredentials: true
        })
        setUser(res.data)
      } catch {
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true
      })
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <>
        <div className="waves-bg">
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
        </div>
        <div className="page-wrapper">
          <p style={{ color: '#0e7490', fontFamily: 'Space Mono', fontSize: '1rem', animation: 'pulse 1.5s infinite' }}>
            Loading...
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="waves-bg">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>
      <div className="page-wrapper">
        <div className="card" style={{ textAlign: 'center' }}>

          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0e7490, #1e40af)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            fontSize: '1.8rem',
            fontWeight: 700,
            color: 'white',
            fontFamily: 'Space Mono',
            boxShadow: '0 8px 24px rgba(14, 116, 144, 0.35)'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2 style={{ fontFamily: 'Space Mono', color: '#e2e8f0', fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem' }}>
            Hey, {user?.name} 👋
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{user?.email}</p>

          <div style={{
            background: 'rgba(30, 58, 95, 0.3)',
            border: '1px solid rgba(14, 116, 144, 0.2)',
            borderRadius: '10px',
            padding: '1rem',
            marginBottom: '1.5rem',
            textAlign: 'left'
          }}>
            <p style={{ color: '#475569', fontSize: '0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>User ID</p>
            <p style={{ color: '#94a3b8', fontFamily: 'Space Mono', fontSize: '0.85rem' }}>{user?.id}</p>
          </div>

          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Home