import { useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const inputStyle = {
  display: 'block', margin: '10px 0', padding: '8px',
  width: '100%', background: '#1e293b', color: 'white',
  border: '1px solid #2a4a6c', borderRadius: '5px',
  boxSizing: 'border-box'
}

function InternReports() {
  const [form, setForm] = useState({
    title: '', content: '', week: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/reports/submit`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Report submitted successfully!')
      setForm({ title: '', content: '', week: '' })
    } catch (err) {
      setMessage('Error submitting report')
    }
  }

  return (
    <div style={{ display: 'flex', background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white' }}>Submit Weekly Report</h2>
        {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
        <input
          placeholder="Report Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Week (e.g. Week 1)"
          value={form.week}
          onChange={e => setForm({ ...form, week: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="Report Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ ...inputStyle, height: '200px' }}
        />
        <button
          onClick={handleSubmit}
          style={{ background: '#22c55e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Submit Report
        </button>
      </div>
    </div>
  )
}

export default InternReports