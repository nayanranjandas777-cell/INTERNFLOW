const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Report = require("../models/Report");

// Intern submits report
router.post("/submit", auth, async (req, res) => {
  try {
    const { title, content, week } = req.body;

    if (!title || !content || !week) {
      return res.status(400).json({ message: "Title, content, and week are all required." });
    }

    // Prevent duplicate report for same week
    const existing = await Report.findOne({ intern: req.user.id, week: week.trim() });
    if (existing) {
      return res.status(400).json({ message: `You already submitted a report for ${week}. Please use a different week.` });
    }

    const report = new Report({
      intern: req.user.id,
      title: title.trim(),
      content: content.trim(),
      week: week.trim()
    });
    await report.save();
    res.json({ message: "Report submitted successfully", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin gets all reports
router.get("/all", auth, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("intern", "name email")
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my reports (intern)
router.get("/my", auth, async (req, res) => {
  try {
    const reports = await Report.find({ intern: req.user.id })
      .sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin marks report as reviewed
router.put("/review/:id", auth, async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: "reviewed" },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;