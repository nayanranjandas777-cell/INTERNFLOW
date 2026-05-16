import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div style={{
      width: '200px', minHeight: '100vh',
      background: '#0f2744', padding: '2rem 1rem',
      display: 'flex', flexDirection: 'column', gap: '1rem'
    }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '1rem' }}>InternFlow</h2>

      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
      <Link to="/attendance" style={{ color: 'white', textDecoration: 'none' }}>Attendance</Link>
      <Link to="/reports" style={{ color: 'white', textDecoration: 'none' }}>Reports</Link>
      <Link to="/intern/reports" style={{ color: 'white', textDecoration: 'none' }}>Submit Report</Link>
      <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>

      {user?.role === 'admin' && (
        <>
          <hr style={{ borderColor: '#1e4a7a' }} />
          <p style={{ color: '#94a3b8', fontSize: '12px' }}>ADMIN</p>
          <Link to="/admin/interns" style={{ color: '#38bdf8', textDecoration: 'none' }}>All Interns</Link>
          <Link to="/admin/evaluate" style={{ color: '#38bdf8', textDecoration: 'none' }}>Evaluate</Link>
          <Link to="/admin/tasks" style={{ color: '#38bdf8', textDecoration: 'none' }}>Tasks</Link>
          <Link to="/admin/reports" style={{ color: '#38bdf8', textDecoration: 'none' }}>Admin Reports</Link>
          <Link to="/admin/monitor" style={{ color: '#38bdf8', textDecoration: 'none' }}>Execution Monitor</Link>
        </>
      )}

      <button onClick={logout} style={{
        marginTop: 'auto', background: '#ef4444',
        color: 'white', border: 'none', padding: '8px',
        borderRadius: '5px', cursor: 'pointer'
      }}>Logout</button>
    </div>
  )
}

export default Navbar