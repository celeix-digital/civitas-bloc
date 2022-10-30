const express = require('express');
const GrantRoutes = require('./grant.route');
const OrganizationRoutes = require('./organization.route');
const router = express.Router()

/**
 * GET v1/admin
 */
 router.use('/grants', GrantRoutes)
 router.use('/organizations', OrganizationRoutes)

module.exports = router;