const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
exports.getallKosarasok = async (req, res) => {
  try {
    if (req.user[0] != null) {
      const users = await sequelize.query(
        "SELECT ID, name, bdate, team,image,introduction FROM kosarasok",
        {
          replacements: {},
          type: QueryTypes.SELECT,
        }
      );
      if (users.length == 0) {
        return res
          .status(404)
          .send({ message: "Hibás kosarasok select", success: false });
      }
      return res.status(200).send({ users: users, success: true });
    }
    return res.status(403).send({ message: "Nincs belépve", success: false });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
