const mongoose = require("mongoose");

const evaluationSchema = mongoose.Schema({
  intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comments: { type: String, required: true },
  performance: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Poor"],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Evaluation", evaluationSchema);