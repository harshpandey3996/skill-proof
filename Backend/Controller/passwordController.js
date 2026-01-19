const User = require("../model/hpmodel");

const forgotPassword = async (req, res) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    console.log("OTP:", otp);
    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ where: { phone } });
    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.json({ message: "OTP verified" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    res.json({ message: "Password reset successful" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { forgotPassword, verifyOtp, resetPassword };
