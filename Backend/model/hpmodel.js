const { DataTypes } = require("sequelize");
const HP = require("../Config/hpconfig");

const janhvi = HP.define("ayush", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  confirmpassword: {
    type: DataTypes.STRING,   // ✅ STRING
   
    allowNull: true,
  },


  phone: {
    type: DataTypes.STRING,   // ✅ STRING
    unique: false,
    allowNull: true,
  },

  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

module.exports = janhvi;
