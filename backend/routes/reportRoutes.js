const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Report = require("../models/Report");

// Intern submits report
router.post("/submit", auth, async (req, res) => {
  try {
    const { title, content, week } = req.body;
    const report = new Report({
      intern: req.user.id,
      title,
      content,
      week
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
      .populate("intern", "name email");
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
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;