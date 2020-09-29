const mongoose = require("mongoose");
const metricSchema = mongoose.Schema({
  metricName: { type: String, required: true },
  maxScore: { type: Number, required: true },
  value: { type: Number, default: 0 }
});
const evaluationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  abstract: { type: String, require: true },
  link: { type: String, require: true },
  analysis: { type: String, require: true },
  review: { type: String, require: true },
  addComments: { type: String },
  metrics: { type: [metricSchema], require: true },
  isSelected: {type: boolean, default: false},
  isStandBy: {type: boolean, default: true}
});

module.exports = mongoose.model("Evaluate", evaluationSchema);
