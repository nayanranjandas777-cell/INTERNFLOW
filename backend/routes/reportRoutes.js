const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Evaluation = require("../models/Evaluation");

// Admin creates evaluation
router.post("/create", auth, async (req, res) => {
  try {
    const { intern, rating, comments, performance } = req.body;
    const evaluation = new Evaluation({
      intern,
      admin: req.user.id,
      rating,
      comments,
      performance
    });
    await evaluation.save();
    res.json({ message: "Evaluation saved", evaluation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all evaluations (admin)
router.get("/all", auth, async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate("intern", "name email")
      .populate("admin", "name");
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get my evaluations (intern)
router.get("/my", auth, async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ intern: req.user._id })
      .populate("admin", "name");
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get evaluation for specific intern
router.get("/:internId", auth, async (req, res) => {
  try {
    const evaluations = await Evaluation.find({
      intern: req.params.internId
    }).populate("admin", "name");
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;