import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const inputStyle = {
  display: 'block', margin: '10px 0', padding: '8px',
  width: '100%', background: '#1e293b', color: 'white',
  border: '1px solid #2a4a6c', borderRadius: '5px',
  boxSizing: 'border-box'
}

function Onboarding() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    department: '',
    startDate: '',
    skills: '',
    bio: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/onboarding`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/dashboard')
    } catch (err) {
      setMessage('Error saving onboarding info')
    }
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', background:'#0f172a' }}>
      <div style={{ background:'#1e293b', padding:'40px', borderRadius:'10px', width:'500px' }}>
        <h2 style={{ color:'#38bdf8', marginBottom:'10px' }}>Welcome to InternFlow! 👋</h2>
        <p style={{ color:'#94a3b8', marginBottom:'20px' }}>Please complete your profile to get started.</p>
        {message && <p style={{ color:'red' }}>{message}</p>}
        <input
          placeholder="Department (e.g. Full Stack, Design)"
          value={form.department}
          onChange={e => setForm({ ...form, department: e.target.value })}
          style={inputStyle}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={form.startDate}
          onChange={e => setForm({ ...form, startDate: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Skills (e.g. React, Node, Python)"
          value={form.skills}
          onChange={e => setForm({ ...form, skills: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="Short Bio"
          value={form.bio}
          onChange={e => setForm({ ...form, bio: e.target.value })}
          style={{ ...inputStyle, height: '100px' }}
        />
        <button
          onClick={handleSubmit}
          style={{ width:'100%', background:'#6366f1', color:'white', padding:'10px', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'16px', marginTop:'10px' }}
        >
          Complete Onboarding
        </button>
      </div>
    </div>
  )
}

export default Onboarding