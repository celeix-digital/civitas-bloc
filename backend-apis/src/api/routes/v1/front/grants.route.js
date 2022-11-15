const express = require("express");
const controller = require("../../../controllers/front/grants.controller");

const { cpUpload } = require("../../../utils/upload");
const router = express.Router();

router.route("/create").post(cpUpload, controller.create);
router.route("/list").get(controller.list);
router.route("/get/:id").get(controller.get); // User - Get Particular Grant Details
router.route("/edit").put(controller.edit);
router.route("/list-active-categories").get(controller.listActiveCategories);
router.route("/get-draft-grants").get(controller.getDraftGrants);
router.route("/publish-grants/:id").get(controller.publishDraft);
module.exports = router;
