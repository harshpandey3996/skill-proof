const janhvi = require("../model/hpmodel"); // REGISTER

const create = async (req, res) => {
  try {
    const user = await janhvi.create(req.body); res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const Findall = async (req, res) => {
  res.json(await janhvi.findAll());
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await janhvi.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });
  if (user.password !== password) return res.status(401).json({ message: "Invalid password" });
  res.json(user);
};

module.exports = { create, Findall, loginUser };
