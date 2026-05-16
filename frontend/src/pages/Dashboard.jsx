import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 })

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/attendance/stats`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ display:'flex', height:'100vh', background:'#0f172a' }}>
      <Navbar />
      <div style={{ flex:1, padding:'30px' }}>
        <h1 style={{ marginBottom:'10px', color:'white' }}>Welcome, {user?.name} 👋</h1>
        <p style={{ color:'#94a3b8', marginBottom:'30px' }}>Here's your overview</p>
        <div style={{ display:'flex', gap:'20px', marginBottom:'30px' }}>
          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1 }}>
            <h3 style={{ color:'#6366f1' }}>Total Interns</h3>
            <h1 style={{ color:'white' }}>{stats.total}</h1>
          </div>
          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1 }}>
            <h3 style={{ color:'#22c55e' }}>Present Today</h3>
            <h1 style={{ color:'white' }}>{stats.present}</h1>
          </div>
          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1 }}>
            <h3 style={{ color:'#ef4444' }}>Absent Today</h3>
            <h1 style={{ color:'white' }}>{stats.absent}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard