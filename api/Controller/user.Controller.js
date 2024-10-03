const sequelize = require("../Models/dbModell");
const { QueryTypes, Op, Transaction, where } = require("sequelize");
const Users = require("../Models/User.Modell");
const Kosarasok = require("../Models/Kosarasok.Modell");
const KosarasokCsalad = require("../Models/KosarasokCsalad.Modell");
const Kedvencek = require("../Models/Kedvencek.Modell");
const KosarasokEredmeny = require("../Models/KosarasokEredmeny.Modell");
//Kedvencek.hasMany(Kosarasok, { foreignKey: "kosarasok_id" });
//Kedvencek.hasMany(Users, { foreignKey: "user_id" });
//Users.belongsToMany(Kosarasok, { through: Kedvencek });
//Kosarasok.belongsToMany(Users, { through: Kedvencek });

Kedvencek.removeAttribute("id");
exports.getallKosarasok = async (req, res) => {
  try {
    if (req.user != null) {
      const users = await Kosarasok.findAll();
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
    if (req.user != null) {
      const kosaras = await Kosarasok.findOne({ where: { ID: req.params.id } });
      if (kosaras == null) {
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
    if (req.user != null) {
      const eredmenyek = await KosarasokEredmeny.findAll({
        where: { kosaras_id: req.params.id },
      });
      if (eredmenyek.length == 0) {
        return res.status(404).send({
          message: "Nincs ennek a kosarasnak eredményei",
          eredmenyek: eredmenyek,
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
exports.getKosarasCsaladtagok = async (req, res) => {
  try {
    if (req.user != null) {
      const csaladtagok = await KosarasokCsalad.findAll({
        where: { Kosaras: req.params.id },
      });
      if (csaladtagok.length == 0) {
        return res.status(404).send({
          message: "Nincs ennek a kosarasnak csaladtagjai",
          csaladtagok: csaladtagok,
          success: false,
        });
      }
      return res.status(200).send({ csaladtagok: csaladtagok, success: true });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.getKedvencek = async (req, res) => {
  try {
    const id = req.params.id;
    const kedvencek = await Kedvencek.findAll({
      where: { user_id: id },
    });
    Kosarasok.hasMany(Kedvencek, { foreignKey: "kosarasok_id" });
    Kedvencek.belongsTo(Kosarasok, { foreignKey: "kosarasok_id" });
    const kedvencKosarasok = await Kedvencek.findAll({
      where: { user_id: id },
      include: [{ model: Kosarasok }],
    });
    let csakKosarasok = [];
    kedvencKosarasok.map((k) => {
      csakKosarasok.push(k.Kosarasok);
    });
    if (kedvencek.length == 0) {
      return res.status(200).send({
        message: "Nincs a felhasználónak kedvencei",
        kedvencek: kedvencek,
        kedvencKosarasok: csakKosarasok,
        success: true,
      });
    }
    return res.status(200).send({
      kedvencek: kedvencek,
      kedvencKosarasok: csakKosarasok,
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.getKedvenc = async (req, res) => {
  try {
    if (!req.body.user_id || !req.body.kosaras_id) {
      return res.status(400).send({
        message: "Hiányzó adatok",
        success: false,
      });
    }
    const kedvenc = await Kedvencek.findAll({
      where: { user_id: req.body.user_id, kosarasok_id: req.body.kosaras_id },
    });
    if (kedvenc.length == 0) {
      return res.status(404).send({
        message: "Nincs a felhasználónak kedvencei",
        kedvenc: false,
        success: true,
      });
    }
    return res
      .status(200)
      .send({ message: "sikeres lekérdezés", kedvenc: true, success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.deleteKedvencek = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    if (req.user.email != req.body.email) {
      t.rollback();
      return res
        .status(403)
        .send({ message: "Rossz felhasználó", success: false });
    }
    const vaneuser_id = await Users.findOne({
      where: { ID: req.user.ID },
      attributes: ["ID"],
    });
    if (vaneuser_id == null) {
      t.rollback();
      return res
        .status(404)
        .send({ message: "Nincs ilyen felhasználó", success: false });
    }
    const vanekosaras_id = await Kosarasok.findOne({
      where: { ID: id },
      attributes: ["ID"],
    });
    if (vanekosaras_id == null) {
      t.rollback();
      return res.status(404).send({ message: "Nincs Kosaras", success: false });
    }
    const response = await Kedvencek.destroy({
      where: {
        user_id: req.user.ID,
        kosarasok_id: id,
      },
      transaction: t,
    });
    if (response == 0) {
      t.rollback();
      return res
        .status(400)
        .send({ message: "Hiba a törlés során", success: false });
    }

    t.commit();
    return res
      .status(200)
      .send({ message: "Sikeres a kedvenc törlése", success: true });
  } catch (e) {
    t.rollback();
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.addKedvencek = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.body.kosarasok_id;
    if (req.user.email != req.body.email) {
      t.rollback();
      return res
        .status(403)
        .send({ message: "Rossz felhasználó", success: false });
    }
    const addkedvenc = await Kedvencek.create(
      {
        user_id: req.user.ID,
        kosarasok_id: id,
      },
      { transaction: t }
    );
    t.commit();
    return res
      .status(200)
      .send({ message: "Sikeres a kedvenc hozzáadása", success: true });
  } catch (e) {
    t.rollback();
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
