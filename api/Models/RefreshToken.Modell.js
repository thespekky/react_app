const { sequelize, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../Models/dbModell");
require("dotenv").config();

class RefreshToken extends Sequelize.Model {}
RefreshToken.init(
  {
    email: { type: DataTypes.STRING, primaryKey: true },
    refreshtoken: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: "refreshtoken",
    timestamps: false,
  }
);
module.exports = RefreshToken;
