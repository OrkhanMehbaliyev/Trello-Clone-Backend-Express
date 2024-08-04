const express = require("express");
const userRoute = require("./users-route");
const authRoute = require("./auth-route");
const authenticateUser = require("../middlewares/auth");

const router = express.Router();

router.use("/user", userRoute);
router.use("/auth", authRoute);

module.exports = router;
