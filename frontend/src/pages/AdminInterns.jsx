import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function AdminInterns() {
  const [interns, setInterns] = useState([])

  useEffect(() => {
    const fetchInterns = async () => {
      const token = localStorage.getItem('token')
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/interns`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setInterns(res.data)
    }
    fetchInterns()
  }, [])

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white' }}>All Interns</h2>
        <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1a3a5c' }}>
              <th style={{ padding: '10px' }}>Name</th>
              <th style={{ padding: '10px' }}>Email</th>
              <th style={{ padding: '10px' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {interns.map(intern => (
              <tr key={intern._id} style={{ borderBottom: '1px solid #2a4a6c' }}>
                <td style={{ padding: '10px' }}>{intern.name}</td>
                <td style={{ padding: '10px' }}>{intern.email}</td>
                <td style={{ padding: '10px' }}>
                  {new Date(intern.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminInterns