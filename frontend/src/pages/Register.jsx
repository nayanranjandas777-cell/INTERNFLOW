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
          <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
            Create Account
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Join InternFlow today
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

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Full Name</label>
        <input placeholder="John Doe" value={name}
          onChange={e => setName(e.target.value)} disabled={loading} />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Email Address</label>
        <input type="email" placeholder="you@example.com" value={email}
          onChange={e => setEmail(e.target.value)} disabled={loading} />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>Password</label>
        <input type="password" placeholder="Enter your password" value={password}
          onChange={e => setPassword(e.target.value)} disabled={loading} />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>
          Admin Code <span style={{ color: '#64748b', fontWeight: '400' }}>(optional — leave blank if intern)</span>
        </label>
        <input placeholder="Enter admin code if applicable" value={adminCode}
          onChange={e => setAdminCode(e.target.value)} disabled={loading} />

        <button onClick={handleRegister} disabled={loading}
          style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '0.9rem' }}>
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