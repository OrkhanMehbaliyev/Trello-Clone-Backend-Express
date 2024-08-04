const authController = require("../controllers/auth-controller.js");
const express = require("express");

const router = express.Router();

router.post("/login", authController.loginUser);

router.post("/token", authController.refreshToken);

router.post("/forgotpassword", authController.forgotPassword);

router.post("/resetPassword/:id", authController.resetPassword);

module.exports = router;
