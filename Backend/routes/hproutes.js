const express = require("express");
const router = express.Router();

const {
  create,
  Findall,
  loginUser,
  checkProgress,
  saveProgress,
  getHistory,
  getCompletedLevels,
} = require("../Controller/hpcontroller");

// User routes
router.post("/post", create);
router.post("/login", loginUser);
router.get("/get", Findall);

// Progress routes
router.post("/check-progress", checkProgress);
router.post("/save-progress", saveProgress);
router.post("/get-completed-levels", getCompletedLevels); // NEW
router.get("/history/:email", getHistory);

module.exports = router;
