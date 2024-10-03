const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../Models/dbModell");
require("dotenv").config();
class KosarasokCsalad extends Sequelize.Model {}
KosarasokCsalad.init(
  {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Vezetek_nev: { type: DataTypes.STRING },
    Kereszt_nev: { type: DataTypes.STRING },
    Kapcsolat: { type: DataTypes.STRING },
    Kosaras: { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    tableName: "kosarasok_csalad",
    timestamps: false,
  }
);
module.exports = KosarasokCsalad;
