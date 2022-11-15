const mongoose = require("mongoose");

/**
 * User Organization Schema
 * @private
 */
const UserOrganizationSchema = new mongoose.Schema(
  {
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organziation",
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

/**
 * @typedef UserOrganization
 */

module.exports = mongoose.model("UserOrganization", UserOrganizationSchema);
