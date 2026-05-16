const Attendance = require('../models/Attendance')
const User = require('../models/User')

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { status } = req.body
    const userId = req.user.id
    const today = new Date().toISOString().split('T')[0]

    // Check if already marked today
    const existing = await Attendance.findOne({ userId, date: today })
    if (existing) {
      return res.status(400).json({ message: 'Attendance already marked today' })
    }

    // Get user name
    const user = await User.findById(userId)

    const attendance = await Attendance.create({
      userId,
      name: user.name,
      date: today,
      status
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

    // Get only intern user IDs (exclude admin)
    const interns = await User.find({ role: 'student' }).select('_id')
    const internIds = interns.map(i => i._id)

    const total = internIds.length
    const present = await Attendance.countDocuments({
      date: today,
      status: 'Present',
      userId: { $in: internIds }
    })
    const absent = total - present < 0 ? 0 : total - present

    res.json({ total, present, absent })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { markAttendance, getMyAttendance, getStats }