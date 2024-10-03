const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../Models/dbModell");
require("dotenv").config();
class KosarasokEredmeny extends Sequelize.Model {}
KosarasokEredmeny.init(
  {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    kosaras_id: { type: DataTypes.INTEGER },
    helyszin: { type: DataTypes.STRING },
    csarnok: { type: DataTypes.STRING },
    pontok: { type: DataTypes.INTEGER },
    buntetesek: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: "kosarasok_eredmenyek",
    timestamps: false,
  }
);
module.exports = KosarasokEredmeny;
