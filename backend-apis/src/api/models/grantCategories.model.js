const mongoose = require("mongoose");

/**
 * GrantCategory Schema
 * @private
 */
const GrantCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: { type: Boolean, default: false },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

/**
 * @typedef GrantCategory
 */

module.exports = mongoose.model("GrantCategory", GrantCategorySchema);
