import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        `https://internflow-hf1d.onrender.com/api/auth/register`,
        { name, email, password }
      )
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/onboarding')
    } catch (err) {
      setError('User already exists or invalid data')
    }
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh' }}>
      <div style={{ background:'#1e293b', padding:'40px', borderRadius:'10px', width:'400px' }}>
        <h2 style={{ textAlign:'center', marginBottom:'20px', color:'#6366f1' }}>Create Account</h2>
        {error && <p style={{ color:'red', textAlign:'center' }}>{error}</p>}
        <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
          style={{ width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'5px', border:'none', boxSizing:'border-box' }} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          style={{ width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'5px', border:'none', boxSizing:'border-box' }} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)}
          style={{ width:'100%', padding:'10px', marginBottom:'20px', borderRadius:'5px', border:'none', boxSizing:'border-box' }} />
        <button onClick={handleRegister}
          style={{ width:'100%', padding:'10px', background:'#6366f1', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'16px' }}>
          Register
        </button>
        <p style={{ textAlign:'center', marginTop:'15px' }}>
          Already have account? <span onClick={() => navigate('/')} style={{ color:'#6366f1', cursor:'pointer' }}>Login</span>
        </p>
      </div>
    </div>
  )
}

export default Register