const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// Admin assigns task
router.post("/assign", auth, async (req, res) => {
  try {
    const { intern, title, description, deadline } = req.body;
    const task = new Task({
      intern,
      title,
      description,
      deadline,
      assignedBy: req.user.id
    });
    await task.save();
    res.json({ message: "Task assigned", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks (admin)
router.get("/all", auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("intern", "name email")
      .populate("assignedBy", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get tasks for specific intern
router.get("/intern/:internId", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ intern: req.params.internId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task status
router.put("/status/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;