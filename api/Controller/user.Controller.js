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
exports.getOneKosaras = async (req, res) => {
  try {
    if (req.user[0] != null) {
      const kosaras = await sequelize.query(
        "SELECT ID, name, bdate, team,image,introduction FROM kosarasok WHERE ID=:ID",
        {
          replacements: { ID: req.params.id },
          type: QueryTypes.SELECT,
        }
      );
      if (kosaras.length == 0) {
        return res
          .status(404)
          .send({ message: "Nincs ilyen kosaras", success: false });
      }
      return res.status(200).send({ kosaras: kosaras, success: true });
    }
    return res.status(403).send({ message: "Nincs belépve", success: false });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.getKosarasEredmenyek = async (req, res) => {
  try {
    if (req.user[0] != null) {
      const eredmenyek = await sequelize.query(
        "SELECT * FROM kosarasok_eredmenyek WHERE kosaras_id=:ID",
        {
          replacements: { ID: req.params.id },
          type: QueryTypes.SELECT,
        }
      );
      if (eredmenyek.length == 0) {
        return res.status(404).send({
          message: "Nincs ilyen kosarasnak eredményei",
          success: false,
        });
      }
      return res.status(200).send({ eredmenyek: eredmenyek, success: true });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
