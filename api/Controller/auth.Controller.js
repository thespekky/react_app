const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sequelize.query(
      "SELECT ID, username, name, email,admin FROM users WHERE email=:Email AND password=:Password",
      {
        replacements: { Email: email, Password: password },
        type: QueryTypes.SELECT,
      }
    );
    if (user.length == 0) {
      return res.send({ message: "Nincs ilyen felhasználó", success: false });
    }
    const token = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "1m" }
    );
    if (!token) {
      return res.send({
        message: "Hiba a token generálása során",
        success: false,
      });
    }
    return res.send({ token: token, success: true, user: user });
  } catch (e) {
    console.log(e);
    return res.send({ message: "Kritikus hiba", success: false });
  }
};
exports.register = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { username, name, email, password } = req.body;
    const vane_user = await sequelize.query(
      "SELECT email FROM users WHERE email=:Email",
      {
        replacements: { Email: email },
        type: QueryTypes.SELECT,
      }
    );
    if (!vane_user) {
      await t.rollback();
      return res.send({ message: "Van ilyen felhasználó", success: false });
    }
    const user = await sequelize.query(
      "INSERT INTO users (username, name, email, password,admin) VALUES (:Username, :Name, :Email, :Password,0)",
      {
        replacements: {
          Username: username,
          Name: name,
          Email: email,
          Password: password,
        },
        type: QueryTypes.INSERT,
        transaction: t,
      }
    );
    if (!user) {
      await t.rollback();
      return res.send({
        message: "Hiba a felhasználó hozzáadása során",
        success: false,
      });
    }
    await t.commit();
    return res.send({ message: "Sikeres regisztráció", success: true });
  } catch (e) {
    await t.rollback();
    console.log(e);
    return res.send({ message: "Kritikus hiba", success: false });
  }
};
