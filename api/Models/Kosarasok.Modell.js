const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../Models/dbModell");
require("dotenv").config();

class Kosarasok extends Sequelize.Model {}
Kosarasok.init(
  {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    bdate: { type: DataTypes.STRING },
    team: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    introduction: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
  },
  {
    sequelize,
    tableName: "kosarasok",
    timestamps: false,
  }
);
module.exports = Kosarasok;
