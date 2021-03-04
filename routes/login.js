const express = require("express");
const userValidator = require("../controllers/user.validator");
const userController = require("../controllers/user.controller");
const router = express.Router();

// login
router.post("/signup", userValidator.validateUserName, userController.userSignup);
router.post("/", userValidator.validateUserName, userController.userLogin);

module.exports = router;