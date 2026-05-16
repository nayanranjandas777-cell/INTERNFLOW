import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import Reports from './pages/Reports'
import Profile from './pages/Profile'
import AdminInterns from './pages/AdminInterns'
import AdminEvaluate from './pages/AdminEvaluate'
import AdminTasks from './pages/AdminTasks'
import AdminReports from './pages/AdminReports'
import InternReports from './pages/InternReports'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/interns" element={<AdminInterns />} />
        <Route path="/admin/evaluate" element={<AdminEvaluate />} />
        <Route path="/admin/tasks" element={<AdminTasks />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/intern/reports" element={<InternReports />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App