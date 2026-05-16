import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function AdminMonitor() {
  const [interns, setInterns] = useState([])
  const [attendance, setAttendance] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [internsRes, attendanceRes] = await Promise.all([
          axios.get(`https://internflow-hf1d.onrender.com/api/auth/monitor`,
            { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`https://internflow-hf1d.onrender.com/api/attendance/all`,
            { headers: { Authorization: `Bearer ${token}` } })
        ])
        setInterns(internsRes.data)
        setAttendance(attendanceRes.data)
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
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Overview of all interns performance</p>

        {loading ? (
          <p style={{ color: 'white' }}>Loading...</p>
        ) : (
          <>
            {/* Performance Table */}
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Performance Overview</h3>
            <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse', marginBottom: '3rem' }}>
              <thead>
                <tr style={{ background: '#1a3a5c' }}>
                  <th style={{ padding: '12px' }}>Intern</th>
                  <th style={{ padding: '12px' }}>Department</th>
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
                    <td style={{ padding: '12px', color: '#38bdf8' }}>{intern.tasksCompleted}/{intern.totalTasks}</td>
                    <td style={{ padding: '12px', color: '#f59e0b' }}>{intern.reportsCount}</td>
                    <td style={{ padding: '12px', color: '#a78bfa' }}>{intern.avgRating ? `${intern.avgRating}/5` : 'N/A'}</td>
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

            {/* Attendance Table */}
            <h3 style={{ color: 'white', marginBottom: '1rem' }}>Attendance Records</h3>
            <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#1a3a5c' }}>
                  <th style={{ padding: '12px' }}>Intern</th>
                  <th style={{ padding: '12px' }}>Today</th>
                  <th style={{ padding: '12px' }}>Total Days Present</th>
                  <th style={{ padding: '12px' }}>Last 7 Days</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map(intern => (
                  <tr key={intern._id} style={{ borderBottom: '1px solid #2a4a6c' }}>
                    <td style={{ padding: '12px' }}>{intern.name}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        color: intern.todayStatus === 'Present' ? '#22c55e' :
                          intern.todayStatus === 'Absent' ? '#ef4444' : '#94a3b8'
                      }}>
                        {intern.todayStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#22c55e' }}>{intern.totalDays} days</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {intern.records.map((r, i) => (
                          <span key={i} style={{
                            background: r.status === 'Present' ? '#22c55e' : '#ef4444',
                            padding: '2px 6px', borderRadius: '4px', fontSize: '11px'
                          }}>
                            {r.date}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminMonitor