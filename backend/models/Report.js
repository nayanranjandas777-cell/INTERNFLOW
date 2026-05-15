const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  week: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "reviewed"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);