const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/Signup", authController.signup);
router.post("/Login", authController.login);

module.exports = router;
