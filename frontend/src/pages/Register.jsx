import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [adminCode, setAdminCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    if (loading) return
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(
        `https://internflow-hf1d.onrender.com/api/auth/register`,
        { name, email, password, adminCode }
      )
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/onboarding')
    } catch (err) {
      setError('User already exists or invalid data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', padding: '20px', overflowY: 'auto'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.97)',
        borderRadius: '24px',
        padding: '32px 36px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 70px rgba(15,23,42,0.25)',
        border: '1px solid rgba(255,255,255,0.7)'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', fontSize: '1.5rem'
          }}>
            🚀
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
            Create Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Join InternFlow today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fee2e2', color: '#dc2626', padding: '10px 14px',
            borderRadius: '10px', marginBottom: '16px', fontSize: '0.85rem',
            fontWeight: '500', borderLeft: '4px solid #ef4444'
          }}>
            {error}
          </div>
        )}

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>Full Name</label>
        <input placeholder="John Doe" value={name}
          onChange={e => setName(e.target.value)} disabled={loading}
          style={{ marginBottom: '4px' }} />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>Email Address</label>
        <input type="email" placeholder="you@example.com" value={email}
          onChange={e => setEmail(e.target.value)} disabled={loading}
          style={{ marginBottom: '4px' }} />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>Password</label>
        <input type="password" placeholder="Enter your password" value={password}
          onChange={e => setPassword(e.target.value)} disabled={loading}
          style={{ marginBottom: '4px' }} />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>
          Admin Code <span style={{ color: '#64748b', fontWeight: '400' }}>(optional)</span>
        </label>
        <input placeholder="Leave blank if intern" value={adminCode}
          onChange={e => setAdminCode(e.target.value)} disabled={loading}
          style={{ marginBottom: '4px' }} />

        <button onClick={handleRegister} disabled={loading}
          style={{ width: '100%', padding: '13px', fontSize: '1rem', marginTop: '10px' }}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '16px', color: '#64748b', fontSize: '0.85rem' }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/')}
            style={{ color: '#4f46e5', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}>
            Login here
          </span>
        </p>
      </div>
    </div>
  )
}

export default Register