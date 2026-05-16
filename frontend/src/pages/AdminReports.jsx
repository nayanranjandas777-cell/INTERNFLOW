import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function AdminReports() {
  const [reports, setReports] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem('token')
      const res = await axios.get(
        `https://internflow-hf1d.onrender.com/api/reports/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setReports(res.data)
    }
    fetchReports()
  }, [])

  const markReviewed = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(
        `https://internflow-hf1d.onrender.com/api/reports/review/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Report marked as reviewed!')
      setReports(reports.map(r => r._id === id ? { ...r, status: 'reviewed' } : r))
    } catch (err) {
      setMessage('Error updating report')
    }
  }

  return (
    <div style={{ display: 'flex', background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white' }}>Intern Reports</h2>
        {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
        {reports.map(report => (
          <div key={report._id} style={{ background: '#1a3a5c', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <h3 style={{ color: 'white' }}>{report.title}</h3>
            <p style={{ color: '#94a3b8' }}>By: {report.intern?.name} | Week: {report.week}</p>
            <p style={{ color: 'white' }}>{report.content}</p>
            <p style={{ color: report.status === 'reviewed' ? 'lightgreen' : 'orange' }}>Status: {report.status}</p>
            {report.status === 'pending' && (
              <button onClick={() => markReviewed(report._id)}
                style={{ background: '#22c55e', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Mark as Reviewed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminReports