const express = require("express");
const controller = require("../../../controllers/front/application.controller");
const { applicationUpload } = require("../../../utils/upload");

const router = express.Router();

router.route("/create").post(applicationUpload, controller.create);
router.route("/edit").put(applicationUpload, controller.edit);
router.route("/list").get(controller.list);
router.route("/get/:id").get(controller.get);
router.route("/get-application-resources/:id").get(controller.listApplicationResources);
module.exports = router;
