const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
exports.getallKosarasok = async (req, res) => {
  try {
    //console.log(req.user[0]);
    if (req.user[0] != null) {
      const users = await sequelize.query(
        "SELECT ID, name, bdate, team,image,introduction FROM kosarasok",
        {
          replacements: {},
          type: QueryTypes.SELECT,
        }
      );
      if (users.length == 0) {
        return res.send({ message: "Hibás kosarasok select", success: true });
      }
      return res.send({ users: users, success: true });
    }
    return res.send({ message: "Nincs belépve", success: false });
  } catch (e) {
    console.log(e);
    return res.send({ message: "Kritikus hiba", success: false });
  }
};
