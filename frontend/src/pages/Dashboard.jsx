import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 })

  useEffect(() => {
    axios.get('http://localhost:5000/api/attendance/stats', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.log(err))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div style={{display:'flex', height:'100vh', background:'#0f172a'}}>

      {/* Sidebar */}
      <div style={{width:'250px', background:'#1e293b', padding:'30px 20px'}}>
        <h2 style={{color:'#6366f1', marginBottom:'40px'}}>InternFlow</h2>
        <ul style={{listStyle:'none', padding:0}}>
          <li onClick={()=>navigate('/dashboard')} style={{marginBottom:'20px', cursor:'pointer', color:'#6366f1', fontWeight:'bold'}}>🏠 Dashboard</li>
          <li onClick={()=>navigate('/attendance')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>📋 Attendance</li>
          <li onClick={()=>navigate('/reports')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>📊 Reports</li>
          <li onClick={()=>navigate('/profile')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>👤 Profile</li>
        </ul>
        <button
          onClick={handleLogout}
          style={{position:'absolute', bottom:'30px', background:'#ef4444', color:'white', border:'none', padding:'10px 20px', borderRadius:'5px', cursor:'pointer'}}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{flex:1, padding:'30px'}}>
        <h1 style={{marginBottom:'10px', color:'white'}}>Welcome, {user?.name} 👋</h1>
        <p style={{color:'#94a3b8', marginBottom:'30px'}}>Here's your overview</p>

        {/* Cards */}
        <div style={{display:'flex', gap:'20px', marginBottom:'30px'}}>
          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1}}>
            <h3 style={{color:'#6366f1'}}>Total Interns</h3>
            <h1 style={{color:'white'}}>{stats.total}</h1>
          </div>
          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1}}>
            <h3 style={{color:'#22c55e'}}>Present Today</h3>
            <h1 style={{color:'white'}}>{stats.present}</h1>
          </div>
          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1}}>
            <h3 style={{color:'#ef4444'}}>Absent Today</h3>
            <h1 style={{color:'white'}}>{stats.absent}</h1>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard