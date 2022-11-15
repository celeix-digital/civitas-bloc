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
    endDate: { type: Date, required: true },

    durationTotal: { type: Number, required: true },

    published: { type: Boolean, default: false },
    fundingType: { type: Number }, //0 = Cooperative Agreement, 1 =Grant, 2 = Other, 3 = Procurement Contract, 4 = CA,5 = G
    opportunityNumber: { type: Number }, //0 = Forcasted, 1 = Posted, 2 = Closed, 3 = Archived
    totalBudget: { type: Number },
    maximuAllowance: { type: Number },
    durationPeriod: { type: Number },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organziation",
    },
    grantCustomFields: {
      type: Array,
      title: { type: String },
      fieldType: { type: Number }, //1=Number, 2=String, 3=Text, 4=Date
    },

    // grantCustomFields: {
    //   Type: [
    //     {
    //       title: { type: String },
    //       fieldType: { type: Number }, //1=Number, 2=String, 3=Text, 4=Date
    //     },
    //   ],
    // },
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
