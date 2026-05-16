const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/interns", auth, async (req, res) => {
  try {
    const interns = await User.find({ role: "student" }).select("-password");
    res.json(interns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/onboarding", auth, async (req, res) => {
  try {
    const { department, startDate, skills, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { department, startDate, skills, bio, onboarded: true },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/monitor", auth, async (req, res) => {
  try {
    const interns = await User.find({ role: "student" }).select("-password");
    const Attendance = require("../models/Attendance");
    const Task = require("../models/Task");
    const Report = require("../models/Report");
    const Evaluation = require("../models/Evaluation");

    const data = await Promise.all(interns.map(async (intern) => {
      const attendanceCount = await Attendance.countDocuments({ user: intern._id });
      const totalTasks = await Task.countDocuments({ intern: intern._id });
      const tasksCompleted = await Task.countDocuments({ intern: intern._id, status: "Completed" });
      const reportsCount = await Report.countDocuments({ intern: intern._id });
      const evaluations = await Evaluation.find({ intern: intern._id });
      const avgRating = evaluations.length
        ? (evaluations.reduce((sum, e) => sum + e.rating, 0) / evaluations.length).toFixed(1)
        : null;

      return {
        _id: intern._id,
        name: intern.name,
        email: intern.email,
        department: intern.department,
        onboarded: intern.onboarded,
        attendanceCount,
        totalTasks,
        tasksCompleted,
        reportsCount,
        avgRating
      };
    }));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;