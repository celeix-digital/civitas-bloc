const express = require("express");
const controller = require("../../../controllers/front/organizations.controller");
const { logoUpload } = require("../../../utils/upload");
const router = express.Router();

router.route("/create").post(logoUpload, controller.create);
router.route("/edit").put(logoUpload, controller.edit);
router.route("/list").get(controller.list); // update
router.route("/get/:id").get(controller.get);
router.route('/active-organization-types').get(controller.listOrganizationTypes)
// 
router.route('/send-invitation-to-user').post(controller.sendInvitationToUser)
router.route('/invitation-to-join-organization').post(controller.processOrganizationJoinRequest)
router.route('/take-requests-to-join-organization/:status').get(controller.takeRequestsToJoinOrganization);
router.route('/accept-user-join-request').post(controller.processUserJoinRequest)
module.exports = router;
