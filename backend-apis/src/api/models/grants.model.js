const mongoose = require("mongoose");

/**
 * Grant Schema
 * @private
 */
const GrantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rfaNo: { type: String, required: true, unique: true },
    executiveSummary: { type: String },
    eligibilityCriteria: { type: String },
    image: { type: String, required: true },
    submissionDeadline: { type: Date, required: true },
    questionsDeadline: { type: Date, required: true },
    startDate: { type: Date, required: true },
    durationTotal: { type: Number, required: true },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organziation",
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "GrantCategory",
    },
    tags: { type: [String] },
    maxBudget: { type: Number, required: true },
  },
  { timestamps: true }
);

/**
 * @typedef Grant
 */

module.exports = mongoose.model("Grant", GrantSchema);
