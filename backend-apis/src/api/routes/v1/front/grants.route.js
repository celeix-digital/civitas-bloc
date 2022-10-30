const express = require("express");
const controller = require("../../../controllers/front/grants.controller");

const { cpUpload } = require("../../../utils/upload");
const router = express.Router();

router.route("/create").post(cpUpload, controller.create);
router.route("/list").get(controller.list);
router.route("/get/:id").get(controller.get); // User - Get Particular Grant Details
router.route("/edit").put(controller.edit);
router.route("/list-active-categories").get(controller.listActiveCategories);
module.exports = router;
