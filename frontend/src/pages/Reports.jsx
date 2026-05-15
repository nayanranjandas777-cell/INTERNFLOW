import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

function Reports() {
  const [records, setRecords] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => { fetchRecords() }, [])

  const fetchRecords = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance/my', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRecords(res.data)
    } catch(err) { console.log(err) }
  }

  const present = records.filter(r => r.status === 'Present').length
  const absent = records.filter(r => r.status === 'Absent').length
  const pieData = [{ name: 'Present', value: present }, { name: 'Absent', value: absent }]
  const barData = records.map(r => ({
    date: r.date,
    Present: r.status === 'Present' ? 1 : 0,
    Absent: r.status === 'Absent' ? 1 : 0
  }))
  const COLORS = ['#22c55e', '#ef4444']

  return (
    <div style={{display:'flex', height:'100vh', background:'#0f172a'}}>
      <div style={{width:'250px', background:'#1e293b', padding:'30px 20px'}}>
        <h2 style={{color:'#6366f1', marginBottom:'40px'}}>InternFlow</h2>
        <ul style={{listStyle:'none', padding:0}}>
          <li onClick={()=>navigate('/dashboard')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>🏠 Dashboard</li>
          <li onClick={()=>navigate('/attendance')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>📋 Attendance</li>
          <li style={{marginBottom:'20px', cursor:'pointer', color:'#6366f1', fontWeight:'bold'}}>📊 Reports</li>
          <li onClick={()=>navigate('/profile')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>👤 Profile</li>
        </ul>
      </div>

      <div style={{flex:1, padding:'30px', overflowY:'auto'}}>
        <h1 style={{marginBottom:'5px', color:'white'}}>Reports</h1>
        <p style={{color:'#94a3b8', marginBottom:'30px'}}>Your attendance analytics</p>

        <div style={{display:'flex', gap:'20px', marginBottom:'30px'}}>
          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1}}>
            <h3 style={{color:'#22c55e'}}>Total Present</h3>
            <h1 style={{color:'white'}}>{present}</h1>
          </div>
          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1}}>
            <h3 style={{color:'#ef4444'}}>Total Absent</h3>
            <h1 style={{color:'white'}}>{absent}</h1>
          </div>
          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1}}>
            <h3 style={{color:'#6366f1'}}>Total Days</h3>
            <h1 style={{color:'white'}}>{records.length}</h1>
          </div>
        </div>

        <div style={{display:'flex', gap:'20px', flexWrap:'wrap'}}>
          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px'}}>
            <h3 style={{marginBottom:'15px', color:'white'}}>Attendance Overview</h3>
            <PieChart width={300} height={300}>
              <Pie data={pieData} cx={150} cy={130} outerRadius={100} dataKey="value" label>
                {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px'}}>
            <h3 style={{marginBottom:'15px', color:'white'}}>Daily Attendance</h3>
            <BarChart width={400} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" fill="#22c55e" />
              <Bar dataKey="Absent" fill="#ef4444" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports