const { DataTypes } = require("sequelize");
const HP = require("../Config/hpconfig");

const User = HP.define("ayush", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  phone: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;
