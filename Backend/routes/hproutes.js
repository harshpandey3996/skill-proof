const express = require("express");
const router = express.Router();

const {
  create,
  Findall,
  loginUser,
  checkProgress,
  saveProgress,
  getHistory,
} = require("../Controller/hpcontroller");



// user
router.post("/post", create);
router.post("/login", loginUser);
router.get("/get", Findall);
router.post("/check-progress", checkProgress);
router.post("/save-progress", saveProgress);
router.get("/history/:email", getHistory);



module.exports = router;
