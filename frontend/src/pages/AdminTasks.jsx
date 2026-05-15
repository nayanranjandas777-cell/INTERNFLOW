import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function AdminTasks() {
  const [interns, setInterns] = useState([])
  const [tasks, setTasks] = useState([])
  const [form, setForm] = useState({
    intern: '', title: '', description: '', deadline: ''
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const fetchData = async () => {
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
    }
    fetchData()
  }, [])

  const handleAssign = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks/assign`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Task assigned successfully!')
      setForm({ intern: '', title: '', description: '', deadline: '' })
    } catch (err) {
      setMessage('Error assigning task')
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white' }}>Assign Tasks</h2>
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
          placeholder="Task Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
        />
        <textarea
          placeholder="Task Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%', height: '80px' }}
        />
        <input
          type="date"
          value={form.deadline}
          onChange={e => setForm({ ...form, deadline: e.target.value })}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
        />
        <button
          onClick={handleAssign}
          style={{ background: '#22c55e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Assign Task
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
            {tasks.map(task => (
              <tr key={task._id} style={{ borderBottom: '1px solid #2a4a6c' }}>
                <td style={{ padding: '10px' }}>{task.intern?.name}</td>
                <td style={{ padding: '10px' }}>{task.title}</td>
                <td style={{ padding: '10px' }}>{task.status}</td>
                <td style={{ padding: '10px' }}>
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminTasks