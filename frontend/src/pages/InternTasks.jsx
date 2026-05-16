import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function InternTasks() {
  const [tasks, setTasks] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => { fetchTasks() }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `https://internflow-hf1d.onrender.com/api/tasks/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateStatus = async (taskId, status) => {
    try {
      await axios.put(
        `https://internflow-hf1d.onrender.com/api/tasks/${taskId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchTasks()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ display:'flex', background:'#0f172a', minHeight:'100vh' }}>
      <Navbar />
      <div style={{ padding:'2rem', flex:1 }}>
        <h2 style={{ color:'white', marginBottom:'20px' }}>My Tasks</h2>
        {tasks.length === 0 ? (
          <p style={{ color:'#94a3b8' }}>No tasks assigned yet.</p>
        ) : (
          <table style={{ width:'100%', color:'white', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#1a3a5c' }}>
                <th style={{ padding:'10px' }}>Title</th>
                <th style={{ padding:'10px' }}>Description</th>
                <th style={{ padding:'10px' }}>Deadline</th>
                <th style={{ padding:'10px' }}>Status</th>
                <th style={{ padding:'10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id} style={{ borderBottom:'1px solid #2a4a6c' }}>
                  <td style={{ padding:'10px' }}>{task.title}</td>
                  <td style={{ padding:'10px' }}>{task.description}</td>
                  <td style={{ padding:'10px' }}>
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td style={{ padding:'10px' }}>
                    <span style={{
                      color: task.status === 'Completed' ? '#22c55e' :
                             task.status === 'In Progress' ? '#f59e0b' : '#94a3b8'
                    }}>
                      {task.status}
                    </span>
                  </td>
                  <td style={{ padding:'10px' }}>
                    <select
                      value={task.status}
                      onChange={e => updateStatus(task._id, e.target.value)}
                      style={{ background:'#1e293b', color:'white', padding:'5px', borderRadius:'5px', border:'1px solid #2a4a6c' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default InternTasks