import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Attendance() {
  const [records, setRecords] = useState([])
  const [status, setStatus] = useState('Present')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => { fetchAttendance() }, [])

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/attendance/my', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRecords(res.data)
    } catch(err) { console.log(err) }
  }

  const markAttendance = async () => {
    try {
      await axios.post('http://localhost:5000/api/attendance/mark',
        { name: user.name, date: today, status },
        { headers: { Authorization: `Bearer ${token}` }}
      )
      setMessage('✅ Attendance marked successfully!')
      fetchAttendance()
    } catch(err) {
      setMessage('⚠️ Already marked today or error occurred')
    }
  }

  return (
    <div style={{display:'flex', height:'100vh', background:'#0f172a'}}>
      <div style={{width:'250px', background:'#1e293b', padding:'30px 20px'}}>
        <h2 style={{color:'#6366f1', marginBottom:'40px'}}>InternFlow</h2>
        <ul style={{listStyle:'none', padding:0}}>
          <li onClick={()=>navigate('/dashboard')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>🏠 Dashboard</li>
          <li style={{marginBottom:'20px', cursor:'pointer', color:'#6366f1', fontWeight:'bold'}}>📋 Attendance</li>
          <li onClick={()=>navigate('/reports')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>📊 Reports</li>
          <li onClick={()=>navigate('/profile')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>👤 Profile</li>
        </ul>
      </div>

      <div style={{flex:1, padding:'30px'}}>
        <h1 style={{marginBottom:'5px', color:'white'}}>Attendance</h1>
        <p style={{color:'#94a3b8', marginBottom:'30px'}}>Mark your attendance for today: {today}</p>

        <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px', marginBottom:'30px', width:'400px'}}>
          <h3 style={{marginBottom:'15px', color:'white'}}>Mark Today's Attendance</h3>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            style={{width:'100%', padding:'10px', borderRadius:'5px', marginBottom:'15px', border:'none', fontSize:'16px', background:'#0f172a', color:'white'}}
          >
            <option>Present</option>
            <option>Absent</option>
          </select>
          <button
            onClick={markAttendance}
            style={{width:'100%', padding:'10px', background:'#6366f1', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'16px'}}
          >
            Mark Attendance
          </button>
          {message && <p style={{color:'#22c55e', marginTop:'10px', textAlign:'center'}}>{message}</p>}
        </div>

        <div style={{background:'#1e293b', padding:'25px', borderRadius:'10px'}}>
          <h3 style={{marginBottom:'15px', color:'white'}}>My Attendance Records</h3>
          <table style={{width:'100%', borderCollapse:'collapse'}}>
            <thead>
              <tr style={{borderBottom:'1px solid #334155'}}>
                <th style={{padding:'10px', textAlign:'left', color:'#94a3b8'}}>Date</th>
                <th style={{padding:'10px', textAlign:'left', color:'#94a3b8'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan="2" style={{padding:'20px', textAlign:'center', color:'#94a3b8'}}>No records yet</td></tr>
              ) : (
                records.map(record => (
                  <tr key={record._id} style={{borderBottom:'1px solid #334155'}}>
                    <td style={{padding:'10px', color:'white'}}>{record.date}</td>
                    <td style={{padding:'10px', color: record.status === 'Present' ? '#22c55e' : '#ef4444'}}>{record.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Attendance