const sequelize = require("../Models/dbModell");
const { QueryTypes, Transaction } = require("sequelize");
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
    if (req.user[0] != null) {
      const csaladtagok = await sequelize.query(
        "SELECT * FROM kosarasok_csalad WHERE Kosaras=:ID",
        {
          replacements: { ID: req.params.id },
          type: QueryTypes.SELECT,
        }
      );
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
    const kedvencek = await sequelize.query(
      "SELECT user_id,kosarasok_id FROM kedvencek WHERE user_id=:id",
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );
    const kedvencKosarasok = await sequelize.query(
      "SELECT * FROM kosarasok k JOIN kedvencek ke ON k.id = ke.kosarasok_id WHERE ke.user_id = 11",
      {
        replacements: { ids: id },
        type: QueryTypes.SELECT,
      }
    );
    if (kedvencek.length == 0) {
      return res.status(200).send({
        message: "Nincs a felhasználónak kedvencei",
        kedvencek: kedvencek,
        kedvencKosarasok: kedvencKosarasok,
        success: true,
      });
    }
    return res.status(200).send({
      kedvencek: kedvencek,
      kedvencKosarasok: kedvencKosarasok,
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
    const kedvenc = await sequelize.query(
      "SELECT user_id,kosarasok_id FROM kedvencek WHERE user_id=:id AND kosarasok_id=:k_id",
      {
        replacements: { id: req.body.user_id, k_id: req.body.kosaras_id },
        type: QueryTypes.SELECT,
      }
    );
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
exports.addKedvenc = async (req, res) => {
  try {
    if (!req.body.user_id || !req.body.kosaras_id) {
      return res.status(400).send({
        message: "Hiányzó adatok",
        success: false,
      });
    }
    const kedvenc = await sequelize.query(
      "INSERT INTO kedvencek (user_id,kosarasok_id) VALUES (:id,:k_id)",
      {
        replacements: { id: req.body.user_id, k_id: req.body.kosaras_id },
        type: QueryTypes.INSERT,
      }
    );
    return res
      .status(200)
      .send({ message: "sikeres hozzáadás", kedvenc: true, success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.deleteKedvencek = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    if (req.user[0].email != req.body.email) {
      t.rollback();
      return res
        .status(403)
        .send({ message: "Rossz felhasználó", success: false });
    }
    const vaneuser_id = await sequelize.query(
      "SELECT ID FROM users WHERE ID=:u_id",
      {
        replacements: { u_id: req.user[0].ID },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );
    if (vaneuser_id.length == 0) {
      t.rollback();
      return res
        .status(404)
        .send({ message: "Nincs ilyen felhasználó", success: false });
    }
    const vanekosaras_id = await sequelize.query(
      "SELECT ID FROM kosarasok WHERE ID=:k_id",
      {
        replacements: { k_id: id },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );
    if (vanekosaras_id.length == 0) {
      t.rollback();
      return res.status(404).send({ message: "Nincs Kosaras", success: false });
    }

    const response = await sequelize.query(
      "DELETE FROM kedvencek WHERE user_id=:u_id AND kosarasok_id=:k_id",
      {
        replacements: { u_id: req.user[0].ID, k_id: id },
        type: QueryTypes.DELETE,
        transaction: t,
      }
    );
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
    if (req.user[0].email != req.body.email) {
      t.rollback();
      return res
        .status(403)
        .send({ message: "Rossz felhasználó", success: false });
    }
    const addkedvenc = await sequelize.query(
      "INSERT INTO kedvencek (user_id,kosarasok_id) VALUES (:u_id,:k_id)",
      {
        replacements: { u_id: req.user[0].ID, k_id: id },
        type: QueryTypes.INSERT,
        transaction: t,
      }
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
