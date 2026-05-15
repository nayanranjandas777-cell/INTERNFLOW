import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data))
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <div style={{background:'#1e293b', padding:'40px', borderRadius:'10px', width:'400px'}}>
        <h2 style={{textAlign:'center', marginBottom:'20px', color:'#6366f1'}}>InternFlow Login</h2>
        {error && <p style={{color:'red', textAlign:'center'}}>{error}</p>}
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{width:'100%', padding:'10px', marginBottom:'10px', borderRadius:'5px', border:'none', boxSizing:'border-box'}}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{width:'100%', padding:'10px', marginBottom:'20px', borderRadius:'5px', border:'none', boxSizing:'border-box'}}
        />
        <button
          onClick={handleLogin}
          style={{width:'100%', padding:'10px', background:'#6366f1', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'16px'}}
        >
          Login
        </button>
        <p style={{textAlign:'center', marginTop:'15px'}}>
          No account? <span onClick={()=>navigate('/register')} style={{color:'#6366f1', cursor:'pointer'}}>Register</span>
        </p>
      </div>
    </div>
  )
}

export default Login