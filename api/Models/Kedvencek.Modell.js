const { sequelize, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../Models/dbModell");
require("dotenv").config();
class Kedvencek extends Sequelize.Model {}
Kedvencek.init(
  {
    user_id: { type: DataTypes.INTEGER },
    kosarasok_id: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "kedvencek",
    timestamps: false,
  }
);
module.exports = Kedvencek;
