const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/interns", auth, async (req, res) => {
  try {
    const interns = await User.find({ role: "student" })
      .select("-password");
    res.json(interns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;