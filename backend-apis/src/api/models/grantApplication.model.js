const mongoose = require("mongoose");

/**
 * GrantApplication Schema
 * @private
 */
const GrantApplicationSchema = new mongoose.Schema(
  {
    grantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grant",
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organziation",
    },
    applicationNumber: { type: String },
    coverLetter: { type: String },
    grantDispatched: { type: Number },
    grantApproved: { type: Number },
    status: { type: Number },
  },
  { timestamps: true }
);

/**
 * @typedef GrantApplication
 */

module.exports = mongoose.model("GrantApplication", GrantApplicationSchema);
