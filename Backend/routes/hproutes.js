const express = require("express");
const router = express.Router();

const {
  create,
  Findall,
  loginUser,
} = require("../Controller/hpcontroller");

const {
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../Controller/passwordController");

// user
router.post("/post", create);
router.post("/login", loginUser);
router.get("/get", Findall);

// password
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
