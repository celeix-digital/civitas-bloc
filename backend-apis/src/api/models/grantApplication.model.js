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
    applicationCustomFields: {
      type: Array,
      title: { type: String },
      value: { type: Number | String | Date }, //1=Number, 2=String, 3=Text, 4=Date
    },
    // applicationCustomFields: {
    //   Type: [{
    //     title: {type: String},
    //     value: {type: Number | String | Date} //1=Number, 2=String, 3=Text, 4=Date
    //   }]
    // },
    approvalAmount: { type: Number, required: true },  // approvalAmount
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
