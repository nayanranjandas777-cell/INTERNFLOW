import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

function Reports() {
  const [records, setRecords] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => { fetchRecords() }, [])

  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        `https://internflow-hf1d.onrender.com/api/attendance/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setRecords(res.data)
    } catch(err) { console.log(err) }
  }

  const present = records.filter(r => r.status === 'Present').length
  const absent = records.filter(r => r.status === 'Absent').length
  const totalDays = new Set(records.map(r => r.date)).size
  const pieData = [{ name: 'Present', value: present }, { name: 'Absent', value: absent }]
  
  const barData = Object.values(
    records.reduce((acc, r) => {
      if (!acc[r.date]) {
        acc[r.date] = { date: r.date, Present: 0, Absent: 0 }
      }
      acc[r.date][r.status] += 1
      return acc
    }, {})
  )

  const COLORS = ['#22c55e', '#ef4444']

  return (
    <div style={{ display:'flex', height:'100vh', background:'#0f172a' }}>
      <Navbar />
      <div style={{ flex:1, padding:'30px', overflowY:'auto' }}>
        <h1 style={{ marginBottom:'5px', color:'white' }}>Reports</h1>
        <p style={{ color:'#94a3b8', marginBottom:'30px' }}>Your attendance analytics</p>

        <div style={{ display:'flex', gap:'20px', marginBottom:'30px' }}>
          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1 }}>
            <h3 style={{ color:'#22c55e' }}>Total Present</h3>
            <h1 style={{ color:'white' }}>{present}</h1>
          </div>
          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1 }}>
            <h3 style={{ color:'#ef4444' }}>Total Absent</h3>
            <h1 style={{ color:'white' }}>{absent}</h1>
          </div>
          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px', flex:1 }}>
            <h3 style={{ color:'#6366f1' }}>Total Days</h3>
            <h1 style={{ color:'white' }}>{totalDays}</h1>
          </div>
        </div>

        <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px' }}>
            <h3 style={{ marginBottom:'15px', color:'white' }}>Attendance Overview</h3>
            <PieChart width={300} height={300}>
              <Pie data={pieData} cx={150} cy={130} outerRadius={100} dataKey="value" label>
                {pieData.map((entry, index) => <Cell key={index} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div style={{ background:'#1e293b', padding:'25px', borderRadius:'10px' }}>
            <h3 style={{ marginBottom:'15px', color:'white' }}>Daily Attendance</h3>
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