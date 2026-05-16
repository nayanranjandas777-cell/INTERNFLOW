const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true
  }
}, { timestamps: true });

// This prevents duplicate attendance for same user on same day
attendanceSchema.index({ userId: 1, date: 1 }, { unique: true })

module.exports = mongoose.model("Attendance", attendanceSchema)