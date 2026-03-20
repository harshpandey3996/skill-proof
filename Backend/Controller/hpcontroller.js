const User = require("../model/hpmodel");
const Progress = require("../model/progressmodel");

// REGISTER
const create = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, phone } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid Email" });

    if (password !== confirmpassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password, phone });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ message: "Wrong password" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CHECK IF LEVEL COMPLETED
const checkProgress = async (req, res) => {
  try {
    const { email, track, level } = req.body;
    const exists = await Progress.findOne({ where: { email, track, level } });
    res.json({ allowed: !exists });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SAVE PROGRESS / CERTIFICATE
const saveProgress = async (req, res) => {
  try {
    const { email, track, level, score, total } = req.body;
    const exists = await Progress.findOne({ where: { email, track, level } });

    if (exists)
      return res.status(400).json({ message: "Already completed" });

    await Progress.create({ email, track, level, score, total });
    res.json({ message: "Progress saved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET HISTORY
const getHistory = async (req, res) => {
  try {
    const { email } = req.params;
    const data = await Progress.findAll({
      where: { email },
      order: [["createdAt", "DESC"]],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET COMPLETED LEVELS FOR TRACK
const getCompletedLevels = async (req, res) => {
  try {
    const { email, track } = req.body;
    const data = await Progress.findAll({
      where: { email, track },
      attributes: ["level"],
    });
    const completedLevels = data.map((item) => item.level);
    res.json({ completedLevels });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const Findall = async (req, res) => {
  res.json(await User.findAll());
};

module.exports = {
  create,
  loginUser,
  checkProgress,
  saveProgress,
  getHistory,
  getCompletedLevels,
  Findall,
};
