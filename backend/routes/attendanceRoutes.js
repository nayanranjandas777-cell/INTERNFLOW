const express = require('express')
const router = express.Router()
const { markAttendance, getMyAttendance, getStats } = require('../controllers/attendanceController')
const protect = require('../middleware/authMiddleware')

router.post('/mark', protect, markAttendance)
router.get('/my', protect, getMyAttendance)
router.get('/stats', protect, getStats)

module.exports = router