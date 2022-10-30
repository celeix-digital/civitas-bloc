const mongoose = require("mongoose");

/**
 * OrganizationType Schema
 * @private
 */

const OrganizationTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/**
 * @typedef OrganizationType
 */

module.exports = mongoose.model("OrganizationType", OrganizationTypeSchema);
