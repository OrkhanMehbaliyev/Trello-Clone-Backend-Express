const userController = require("../controllers/user-controller.js");

const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth.js");

router.get("/getallusers", authenticateUser, userController.getAllUsers);
router.get("/getoneuser/:id", authenticateUser, userController.getOneUser);
router.get(
  "/getoneuserbyactivestatus/:id",
  authenticateUser,
  userController.getOneUserByActiveStatus
);
router.get(
  "/getuserbyusername/:username",
  authenticateUser,
  userController.getUserByUsername
);
router.get(
  "/getusersbyactivestatus",
  authenticateUser,
  userController.getUsersByActiveStatus
);
router.post("/", userController.addUser);

module.exports = router;
