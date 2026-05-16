import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function AdminMonitor() {
  const [interns, setInterns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/monitor`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setInterns(res.data)
      } catch (err) {
        console.log(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div style={{ display: 'flex', background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white' }}>Execution Monitoring</h2>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Overview of all interns' performance
        </p>
        {loading ? (
          <p style={{ color: 'white' }}>Loading...</p>
        ) : (
          <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#1a3a5c' }}>
                <th style={{ padding: '12px' }}>Intern</th>
                <th style={{ padding: '12px' }}>Department</th>
                <th style={{ padding: '12px' }}>Attendance</th>
                <th style={{ padding: '12px' }}>Tasks Done</th>
                <th style={{ padding: '12px' }}>Reports</th>
                <th style={{ padding: '12px' }}>Avg Rating</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {interns.map(intern => (
                <tr key={intern._id} style={{ borderBottom: '1px solid #2a4a6c' }}>
                  <td style={{ padding: '12px' }}>{intern.name}</td>
                  <td style={{ padding: '12px' }}>{intern.department || 'N/A'}</td>
                  <td style={{ padding: '12px', color: '#22c55e' }}>
                    {intern.attendanceCount} days
                  </td>
                  <td style={{ padding: '12px', color: '#38bdf8' }}>
                    {intern.tasksCompleted}/{intern.totalTasks}
                  </td>
                  <td style={{ padding: '12px', color: '#f59e0b' }}>
                    {intern.reportsCount}
                  </td>
                  <td style={{ padding: '12px', color: '#a78bfa' }}>
                    {intern.avgRating ? `${intern.avgRating}/5` : 'N/A'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: intern.onboarded ? '#22c55e' : '#ef4444',
                      padding: '4px 8px', borderRadius: '4px', fontSize: '12px'
                    }}>
                      {intern.onboarded ? 'Active' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminMonitor