const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
exports.getusers = async (req, res) => {
  try {
    if (req.user[0].admin == 1) {
      const users = await sequelize.query(
        "SELECT ID, username, name, email,admin FROM users",
        {
          replacements: {},
          type: QueryTypes.SELECT,
        }
      );
      if (users.length == 0) {
        return res.send({ message: "Hibás select", success: true });
      }
      return res.send({ users: users, success: true });
    }
    console.log("first");
    return res.send({ message: "Nincs admin jogosultság", success: false });
  } catch (e) {
    console.log(e);
    return res.send({ message: "Kritikus hiba", success: false });
  }
};
