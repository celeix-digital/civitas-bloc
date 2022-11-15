const mongoose = require("mongoose");

/**
 * Organziation Schema
 * @private
 */
const OrganziationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizationType" },
    websiteAboutOrganization: { type: String },
    serviceProvided: { type: String },
    walletAddress: { type: String },
    logo: { type: String },
    organizationCode: { type: String },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  { timestamps: true }
);

/**
 * @typedef Organziation
 */

module.exports = mongoose.model("Organziation", OrganziationSchema);
