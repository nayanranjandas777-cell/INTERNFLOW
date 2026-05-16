const Attendance = require('../models/Attendance')
const User = require('../models/User')

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { status } = req.body
    const userId = req.user.id
    const today = new Date().toISOString().split('T')[0]

    const existing = await Attendance.findOne({ userId, date: today })
    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked today' })
    }

    const user = await User.findById(userId)
    const attendance = await Attendance.create({
      userId, name: user.name, date: today, status
    })
    res.status(201).json(attendance)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get My Attendance
const getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.user.id }).sort({ date: -1 })
    res.json(records)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get Dashboard Stats
const getStats = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const interns = await User.find({ role: 'student' }).select('_id')
    const internIds = interns.map(i => i._id)
    const total = internIds.length
    const present = await Attendance.countDocuments({
      date: today, status: 'Present', userId: { $in: internIds }
    })
    const absent = total - present < 0 ? 0 : total - present
    res.json({ total, present, absent })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get All Interns Attendance (Admin)
const getAllAttendance = async (req, res) => {
  try {
    const interns = await User.find({ role: 'student' }).select('name email')
    const today = new Date().toISOString().split('T')[0]

    const result = await Promise.all(interns.map(async (intern) => {
      const records = await Attendance.find({ userId: intern._id }).sort({ date: -1 })
      const todayRecord = records.find(r => r.date === today)
      return {
        _id: intern._id,
        name: intern.name,
        email: intern.email,
        todayStatus: todayRecord ? todayRecord.status : 'Not Marked',
        totalDays: records.length,
        records: records.slice(0, 7) // last 7 days
      }
    }))

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { markAttendance, getMyAttendance, getStats, getAllAttendance }