const express = require("express");
const controller = require("../../../controllers/front/users.controller");
const router = express.Router();
const { cpUpload } = require("../../../utils/upload");

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/verify-email/:id/:token").get(controller.verifyEmail);
router.route("/update-profile").put(cpUpload, controller.updateProfile);
router.route("/forgot-password").post(controller.forgotPassword);
router.route("/reset-password/:id/:token").post(controller.resetPassword);

module.exports = router;
