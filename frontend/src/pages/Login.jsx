import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (loading) return
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(
        `https://internflow-hf1d.onrender.com/api/auth/login`,
        { email, password }
      )
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.97)',
        borderRadius: '24px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 25px 70px rgba(15,23,42,0.25)',
        border: '1px solid rgba(255,255,255,0.7)'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '1.8rem'
          }}>
            🚀
          </div>
          <h2 style={{
            fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px'
          }}>
            Welcome back
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Sign in to your InternFlow account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee2e2', color: '#dc2626', padding: '12px 16px',
            borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem',
            fontWeight: '500', borderLeft: '4px solid #ef4444'
          }}>
            {error}
          </div>
        )}

        {/* Fields */}
        <div style={{ marginBottom: '4px' }}>
          <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Register link */}
        <p style={{
          textAlign: 'center', marginTop: '24px',
          color: '#64748b', fontSize: '0.9rem'
        }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{
              color: '#4f46e5', fontWeight: '600',
              cursor: 'pointer', textDecoration: 'underline'
            }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login