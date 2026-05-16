import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const inputStyle = {
  display: 'block', margin: '10px 0', padding: '8px',
  width: '100%', background: '#1e293b', color: 'white',
  border: '1px solid #2a4a6c', borderRadius: '5px',
  boxSizing: 'border-box'
}

function InternReports() {
  const [form, setForm] = useState({ title: '', content: '', week: '' })
  const [message, setMessage] = useState('')
  const [reports, setReports] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => { fetchReports() }, [])

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `https://internflow-hf1d.onrender.com/api/reports/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReports(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async () => {
    try {
      await axios.post(
        `https://internflow-hf1d.onrender.com/api/reports/submit`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Report submitted successfully!')
      setForm({ title: '', content: '', week: '' })
      fetchReports()
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
        <input placeholder="Report Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} />
        <input placeholder="Week (e.g. Week 1)" value={form.week}
          onChange={e => setForm({ ...form, week: e.target.value })} style={inputStyle} />
        <textarea placeholder="Report Content" value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ ...inputStyle, height: '200px' }} />
        <button onClick={handleSubmit}
          style={{ background: '#22c55e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Submit Report
        </button>

        <h3 style={{ color: 'white', marginTop: '2rem' }}>My Submitted Reports</h3>
        {reports.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No reports submitted yet.</p>
        ) : (
          reports.map(report => (
            <div key={report._id} style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', marginBottom: '10px', borderLeft: `4px solid ${report.status === 'reviewed' ? '#22c55e' : '#f59e0b'}` }}>
              <h4 style={{ color: 'white', margin: '0 0 5px' }}>{report.title}</h4>
              <p style={{ color: '#94a3b8', margin: '0 0 5px' }}>Week: {report.week}</p>
              <p style={{ color: '#94a3b8', margin: '0 0 5px' }}>{report.content}</p>
              <span style={{ color: report.status === 'reviewed' ? '#22c55e' : '#f59e0b', fontWeight: 'bold' }}>
                Status: {report.status === 'reviewed' ? '✅ Reviewed' : '⏳ Pending Review'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default InternReports