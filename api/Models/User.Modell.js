const { sequelize, DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../Models/dbModell");
require("dotenv").config();

class Users extends Sequelize.Model {}
Users.init(
  {
    ID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    admin: { type: DataTypes.BOOLEAN },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);
module.exports = Users;
