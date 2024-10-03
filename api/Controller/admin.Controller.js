const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
const Users = require("../Models/User.Modell");
exports.getusers = async (req, res) => {
  try {
    if (req.user.admin == 1) {
      const users = await Users.findAll({
        atributes: {
          exclude: ["password"],
        },
      });
      return res.status(200).send({ users: users, success: true });
    }
    return res
      .status(403)
      .send({ message: "Nincs admin jogosultság", success: false });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
