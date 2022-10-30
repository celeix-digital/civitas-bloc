const mongoose = require('mongoose');

/**
 * GrantApplicationResource Schema
 * @private
 */
const GrantApplicationResourceSchema = new mongoose.Schema({
    grantApplicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GrantApplication",
    },
    type: { type: Number },
    file: { type: String },
    status: { type: Number },
}, { timestamps: true }
);

/**
 * @typedef GrantApplicationResource
 */

module.exports = mongoose.model('GrantApplicationResource', GrantApplicationResourceSchema);