import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

const inputStyle = {
  display: 'block', margin: '10px 0', padding: '8px',
  width: '100%', background: '#1e293b', color: 'white',
  border: '1px solid #2a4a6c', borderRadius: '5px',
  boxSizing: 'border-box'
}

function AdminTasks() {
  const [interns, setInterns] = useState([])
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({
    intern: '', title: '', description: '', deadline: ''
  })
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [assigning, setAssigning] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const internsRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/interns`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setInterns(internsRes.data)
      const tasksRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks(tasksRes.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAssign = async () => {
    if (assigning) return

    if (!form.intern || !form.title.trim() || !form.description.trim() || !form.deadline) {
      setMessage('Please fill in all fields before assigning.')
      setMessageType('error')
      return
    }

    setAssigning(true)
    setMessage('')

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks/assign`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Task assigned successfully!')
      setMessageType('success')
      setForm({ intern: '', title: '', description: '', deadline: '' })
      fetchData()
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Error assigning task. Please try again.'
      setMessage(errMsg)
      setMessageType('error')
    } finally {
      setAssigning(false)
    }
  }

  return (
    <div style={{ display: 'flex', background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white' }}>Assign Tasks</h2>

        {message && (
          <p style={{
            color: messageType === 'success' ? 'lightgreen' : '#f87171',
            background: messageType === 'success' ? '#14532d44' : '#7f1d1d44',
            padding: '10px', borderRadius: '6px', marginBottom: '10px'
          }}>
            {message}
          </p>
        )}

        <select
          value={form.intern}
          onChange={e => setForm({ ...form, intern: e.target.value })}
          style={inputStyle}
          disabled={assigning}
        >
          <option value="">Select Intern</option>
          {interns.map(i => (
            <option key={i._id} value={i._id}>{i.name}</option>
          ))}
        </select>

        <input
          placeholder="Task Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={inputStyle}
          disabled={assigning}
        />

        <textarea
          placeholder="Task Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={{ ...inputStyle, height: '80px' }}
          disabled={assigning}
        />

        <input
          type="date"
          value={form.deadline}
          onChange={e => setForm({ ...form, deadline: e.target.value })}
          style={inputStyle}
          disabled={assigning}
        />

        <button
          onClick={handleAssign}
          disabled={assigning}
          style={{
            background: assigning ? '#166534' : '#22c55e',
            color: 'white', padding: '10px 20px', border: 'none',
            borderRadius: '5px', cursor: assigning ? 'not-allowed' : 'pointer',
            opacity: assigning ? 0.7 : 1
          }}
        >
          {assigning ? 'Assigning...' : 'Assign Task'}
        </button>

        <h3 style={{ color: 'white', marginTop: '2rem' }}>All Tasks</h3>
        <table style={{ width: '100%', color: 'white', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1a3a5c' }}>
              <th style={{ padding: '10px' }}>Intern</th>
              <th style={{ padding: '10px' }}>Title</th>
              <th style={{ padding: '10px' }}>Status</th>
              <th style={{ padding: '10px' }}>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>
                  No tasks assigned yet
                </td>
              </tr>
            ) : (
              tasks.map(task => (
                <tr key={task._id} style={{ borderBottom: '1px solid #2a4a6c' }}>
                  <td style={{ padding: '10px' }}>{task.intern?.name}</td>
                  <td style={{ padding: '10px' }}>{task.title}</td>
                  <td style={{ padding: '10px', color: task.status === 'Completed' ? '#22c55e' : task.status === 'In Progress' ? '#f59e0b' : '#94a3b8' }}>
                    {task.status}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminTasks