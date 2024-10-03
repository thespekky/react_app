const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const Users = require("../Models/User.Modell");
const RefreshToken = require("../Models/RefreshToken.Modell");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        message: "Nincs minden adat megadva",
        success: false,
      });
    }
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) {
      return res.status(404).send({
        message: "Nincs ilyen felhasználó",
        success: false,
      });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(404).send({
        message: "Hibás jelszó ",
        success: false,
      });
    }

    const token = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "20m" }
    );
    const reftokenvane = await RefreshToken.findOne({
      where: {
        email: email,
      },
    });
    let refreshToken;
    if (reftokenvane != null) {
      refreshToken = reftokenvane;
    } else {
      refreshToken = jwt.sign(
        { email: req.body.email },
        process.env.REFRESS_TOKEN_KEY
      );
      const t = await sequelize.transaction();
      const reftoken = await RefreshToken.create(
        {
          email: email,
          refreshtoken: refreshToken,
        },
        { transaction: t }
      );
      if (!reftoken) {
        await t.rollback();
        return res.status(500).send({
          message: "Hiba a refreshtoken hozzáadása során",
          success: false,
        });
      }
      await t.commit();
    }

    if (!token) {
      return res.status(400).send({
        message: "Hiba a token generálása során",
        success: false,
      });
    }

    return res.status(200).send({
      token: token,
      refreshtoken: refreshToken,
      success: true,
      user: user,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.logout = async (req, res) => {
  try {
    const { email } = req.body;
    const t = await sequelize.transaction();
    await t.commit();
    return res
      .status(200)
      .send({ message: "Sikeres kijelentkezés", success: true });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
exports.refreshtoken = async (req, res) => {
  let token;
  let email;
  try {
    email = req.body.email;
    const { refreshtoken, authtoken } = req.body;
    if (!refreshtoken || !authtoken) {
      return res.status(404).send({ message: "Nincs token", success: false });
    }
    const tokenvalidálás = jwt.verify(authtoken, process.env.ACCESS_TOKEN_KEY);
    if (tokenvalidálás) {
      return res
        .status(200)
        .send({ token: authtoken, success: true, changed: false });
    }
    const data = jwt.verify(refreshtoken, process.env.REFRESS_TOKEN_KEY);
    if (!data) {
      return res
        .status(404)
        .send({ message: "Hibási refreshtoken", success: false });
    }
    const reftoken = await RefreshToken.findOne({
      where: {
        refreshtoken: refreshtoken,
      },
    });
    if (!reftoken) {
      return res.status(404).send({
        message: "Nincs ilyen refreshtoken az adatbázisban",
        success: false,
      });
    }
    token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "20m",
    });
    if (!token) {
      return res.status(500).send({
        message: "Hiba a token generálása során",
        success: false,
      });
    }

    return res.status(200).send({ token: token, success: true });
  } catch (e) {
    console.log(e);
    token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "20m",
    });
    if (!token) {
      return res.status(500).send({
        message: "Hiba a token generálása során",
        success: false,
      });
    }
    return res.status(200).send({
      message: "az új token:",
      token: token,
      success: true,
      changed: true,
    });
  }
};
exports.register = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { username, name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const vane_user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (vane_user != null) {
      await t.rollback();
      return res
        .status(400)
        .send({ message: "Van ilyen felhasználó", success: false });
    }
    const user = await Users.create(
      {
        username: username,
        name: name,
        email: email,
        password: hashedPassword,
        admin: 0,
      },
      { transaction: t }
    );
    if (!user) {
      await t.rollback();
      return res.status(500).send({
        message: "Hiba a felhasználó hozzáadása során",
        success: false,
      });
    }
    await t.commit();
    return res
      .status(201)
      .send({ message: "Sikeres regisztráció", success: true });
  } catch (e) {
    await t.rollback();
    console.log(e);
    return res.status(500).send({ message: "Kritikus hiba", success: false });
  }
};
