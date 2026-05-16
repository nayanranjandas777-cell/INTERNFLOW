import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Onboarding() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    department: '', startDate: '', skills: '', bio: ''
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (loading) return
    if (!form.department.trim() || !form.startDate || !form.skills.trim()) {
      setMessage('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setMessage('')
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/onboarding`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/dashboard')
    } catch (err) {
      setMessage('Error saving onboarding info. Please try again.')
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
        padding: '36px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 25px 70px rgba(15,23,42,0.25)',
        border: '1px solid rgba(255,255,255,0.7)'
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', fontSize: '1.6rem'
          }}>
            👋
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
            Welcome to InternFlow!
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Complete your profile to get started
          </p>
        </div>

        {/* Error */}
        {message && (
          <div style={{
            background: '#fee2e2', color: '#dc2626', padding: '10px 14px',
            borderRadius: '10px', marginBottom: '16px', fontSize: '0.85rem',
            fontWeight: '500', borderLeft: '4px solid #ef4444'
          }}>
            {message}
          </div>
        )}

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>Department</label>
        <input
          placeholder="e.g. Full Stack, Design, Marketing"
          value={form.department}
          onChange={e => setForm({ ...form, department: e.target.value })}
          disabled={loading}
        />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>Start Date</label>
        <input
          type="date"
          value={form.startDate}
          onChange={e => setForm({ ...form, startDate: e.target.value })}
          disabled={loading}
        />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>Skills</label>
        <input
          placeholder="e.g. React, Node, Python"
          value={form.skills}
          onChange={e => setForm({ ...form, skills: e.target.value })}
          disabled={loading}
        />

        <label style={{ fontWeight: '600', color: '#0f172a', fontSize: '0.85rem' }}>
          Short Bio <span style={{ color: '#64748b', fontWeight: '400' }}>(optional)</span>
        </label>
        <textarea
          placeholder="Tell us a little about yourself..."
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
          disabled={loading}
          style={{ minHeight: '90px' }}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', padding: '13px', fontSize: '1rem', marginTop: '8px' }}
        >
          {loading ? 'Saving...' : 'Complete Onboarding'}
        </button>
      </div>
    </div>
  )
}

export default Onboarding