const express = require("express");
const userRoutes = require("./user.route");
const grantRoutes = require("./grants.route");
const organizationRoutes = require("./organizations.route");
const applicationRoutes = require("./application.route");
const router = express.Router();
/**
 * GET v1/status
 */
router.use("/users", userRoutes);
router.use("/organizations", organizationRoutes); // updates
router.use("/grants", grantRoutes); // updates
router.use("/grant-application", applicationRoutes); // updates

module.exports = router;
