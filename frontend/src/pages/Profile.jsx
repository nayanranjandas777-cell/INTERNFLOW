import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div style={{display:'flex', height:'100vh', background:'#0f172a'}}>

      {/* Sidebar */}
      <div style={{width:'250px', background:'#1e293b', padding:'30px 20px'}}>
        <h2 style={{color:'#6366f1', marginBottom:'40px'}}>InternFlow</h2>
        <ul style={{listStyle:'none', padding:0}}>
          <li onClick={()=>navigate('/dashboard')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>🏠 Dashboard</li>
          <li onClick={()=>navigate('/attendance')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>📋 Attendance</li>
          <li onClick={()=>navigate('/reports')} style={{marginBottom:'20px', cursor:'pointer', color:'white'}}>📊 Reports</li>
          <li style={{marginBottom:'20px', cursor:'pointer', color:'#6366f1', fontWeight:'bold'}}>👤 Profile</li>
        </ul>
      </div>

      {/* Main */}
      <div style={{flex:1, padding:'30px', display:'flex', alignItems:'center', justifyContent:'center', background:'#0f172a'}}>
        <div style={{background:'#1e293b', padding:'40px', borderRadius:'10px', width:'400px', textAlign:'center'}}>
          <div style={{width:'80px', height:'80px', borderRadius:'50%', background:'#6366f1', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px', margin:'0 auto 20px'}}>
            👤
          </div>
          <h2 style={{marginBottom:'5px', color:'white'}}>{user?.name || 'User'}</h2>
          <p style={{color:'#94a3b8', marginBottom:'30px'}}>{user?.email || 'No email found'}</p>
          <div style={{background:'#0f172a', padding:'15px', borderRadius:'8px', marginBottom:'15px'}}>
            <p style={{color:'#94a3b8', margin:0}}>Role</p>
            <p style={{margin:0, marginTop:'5px', color:'#6366f1', fontWeight:'bold'}}>
              {user?.role || 'Student Intern'}
            </p>
          </div>
          <div style={{background:'#0f172a', padding:'15px', borderRadius:'8px'}}>
            <p style={{color:'#94a3b8', margin:0}}>Member Since</p>
            <p style={{margin:0, marginTop:'5px', color:'white'}}>
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {month:'long', year:'numeric'}) : 'May 2026'}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile