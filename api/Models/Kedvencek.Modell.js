const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../Models/dbModell");
const Users = require("./User.Modell");
const Kosarasok = require("./Kosarasok.Modell");
require("dotenv").config();
class Kedvencek extends Sequelize.Model {}
Kedvencek.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "ID",
      },
    },
    kosarasok_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Kosarasok,
        key: "ID",
      },
    },
  },
  {
    sequelize,
    tableName: "kedvencek",
    primaryKey: false,
    timestamps: false,
  }
);
//Kedvencek.belongsTo(Kosarasok, { foreignKey: "kosarasok_id", targetKey: "ID" });
//Kedvencek.belongsTo(Users, { foreignKey: "user_id", targetKey: "ID" });
module.exports = Kedvencek;
