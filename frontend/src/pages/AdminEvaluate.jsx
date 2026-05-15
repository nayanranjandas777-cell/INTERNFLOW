import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function AdminEvaluate() {
  const [interns, setInterns] = useState([])
  const [form, setForm] = useState({
    intern: '', rating: '', comments: '', performance: 'Good'
  })
  const [message, setMessage] = useState('')

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

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/evaluations/create`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Evaluation saved successfully!')
      setForm({ intern: '', rating: '', comments: '', performance: 'Good' })
    } catch (err) {
      setMessage('Error saving evaluation')
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white' }}>Evaluate Intern</h2>
        {message && <p style={{ color: 'lightgreen' }}>{message}</p>}
        <select
          value={form.intern}
          onChange={e => setForm({ ...form, intern: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
        >
          <option value="">Select Intern</option>
          {interns.map(i => (
            <option key={i._id} value={i._id}>{i.name}</option>
          ))}
        </select>
        <input
          type="number" min="1" max="5"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={e => setForm({ ...form, rating: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
        />
        <select
          value={form.performance}
          onChange={e => setForm({ ...form, performance: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
        >
          <option>Excellent</option>
          <option>Good</option>
          <option>Average</option>
          <option>Poor</option>
        </select>
        <textarea
          placeholder="Comments"
          value={form.comments}
          onChange={e => setForm({ ...form, comments: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%', height: '100px' }}
        />
        <button
          onClick={handleSubmit}
          style={{ background: '#22c55e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Submit Evaluation
        </button>
      </div>
    </div>
  )
}

export default AdminEvaluate