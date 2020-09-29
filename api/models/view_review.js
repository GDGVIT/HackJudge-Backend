const mongoose = require("mongoose");

const viewReviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  qualifiedTeams: { type: Number, required: true },
  evaluatedTeams: { type: Number, required: true }
});

module.exports = mongoose.model("V_R", viewReviewSchema);
