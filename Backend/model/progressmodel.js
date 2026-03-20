const { DataTypes } = require("sequelize");
const HP = require("../Config/hpconfig");


const Progress = HP.define("progress", {
  email: {
    type: DataTypes.STRING,
  },
  track: {
    type: DataTypes.STRING,
  },
  level: {
    type: DataTypes.STRING,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  total: {
    type: DataTypes.INTEGER,
  },
});
