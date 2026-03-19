const User = require("../model/hpmodel");

// REGISTER
const create = async (req, res) => {
  try {
    const { name, email, password, confirmpassword, phone } = req.body;

    // Gmail validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Only @gmail.com emails are allowed",
      });
    }

    // Password match check
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Password length
    if (password.length > 8) {
      return res.status(400).json({
        message: "Password max 8 characters allowed",
      });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Create user (confirmpassword store nahi karna)
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const Findall = async (req, res) => {
  res.json(await User.findAll());
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, Findall, loginUser };
