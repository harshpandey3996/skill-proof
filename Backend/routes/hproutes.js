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

// 👇 ADD THIS (User model import)
const User = require("../model/hpmodel");

/* ================= USER AUTH ROUTES ================= */

router.post("/post", create);
router.post("/login", loginUser);
router.get("/get", Findall);

/* ================= PROGRESS ROUTES ================= */

router.post("/check-progress", checkProgress);
router.post("/save-progress", saveProgress);
router.post("/get-completed-levels", getCompletedLevels);
router.get("/history/:email", getHistory);

/* ================= ADMIN / DEBUG ROUTES ================= */

// 👉 All users (database check)
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Total users count
router.get("/user-count", async (req, res) => {
  try {
    const count = await User.count();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
