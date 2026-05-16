import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

function InternEvaluation() {
  const [evaluations, setEvaluations] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => { fetchEvaluations() }, [])

  const fetchEvaluations = async () => {
    try {
      const res = await axios.get(
        `https://internflow-hf1d.onrender.com/api/evaluations/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setEvaluations(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const stars = (rating) => '⭐'.repeat(rating)

  return (
    <div style={{ display: 'flex', background: '#0f172a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h2 style={{ color: 'white', marginBottom: '20px' }}>My Evaluations</h2>
        {evaluations.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No evaluations yet.</p>
        ) : (
          evaluations.map(ev => (
            <div key={ev._id} style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '15px', borderLeft: '4px solid #6366f1' }}>
              <p style={{ color: '#94a3b8', margin: '0 0 8px' }}>
                Evaluated by: <span style={{ color: 'white' }}>{ev.evaluatedBy?.name || 'Admin'}</span>
              </p>
              <p style={{ color: '#94a3b8', margin: '0 0 8px' }}>
                Performance: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{ev.performance}</span>
              </p>
              <p style={{ color: '#94a3b8', margin: '0 0 8px' }}>
                Rating: <span style={{ color: '#f59e0b' }}>{stars(ev.rating)} ({ev.rating}/5)</span>
              </p>
              {ev.comments && (
                <p style={{ color: '#94a3b8', margin: '0' }}>
                  Comments: <span style={{ color: 'white' }}>{ev.comments}</span>
                </p>
              )}
              <p style={{ color: '#475569', margin: '8px 0 0', fontSize: '12px' }}>
                {new Date(ev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default InternEvaluation