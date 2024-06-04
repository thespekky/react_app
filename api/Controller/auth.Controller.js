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
      return res.send({
        message: "Hibás jelszó vagy nincs ilyen felhasználó",
        success: false,
      });
    }
    const token = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      { email: req.body.email },
      process.env.REFRESS_TOKEN_KEY
    );
    if (!token) {
      return res.send({
        message: "Hiba a token generálása során",
        success: false,
      });
    }
    const t = await sequelize.transaction();
    const reftoken = await sequelize.query(
      "INSERT INTO refreshtoken (email, refreshtoken) VALUES (:Email, :Token)",
      {
        replacements: {
          Email: email,
          Token: refreshToken,
        },
        type: QueryTypes.INSERT,
        transaction: t,
      }
    );
    if (!reftoken) {
      await t.rollback();
      return res.send({
        message: "Hiba a refreshtoken hozzáadása során",
        success: false,
      });
    }
    await t.commit();

    return res.send({
      token: token,
      refreshtoken: refreshToken,
      success: true,
      user: user,
    });
  } catch (e) {
    console.log(e);
    return res.send({ message: "Kritikus hiba", success: false });
  }
};
exports.logout = async (req, res) => {
  try {
    const { email } = req.body;
    const t = await sequelize.transaction();

    //a tpye DELETE miatt nem ad vissza értéket
    const tokendelete = await sequelize.query(
      "DELETE FROM refreshtoken WHERE email=:Email",
      {
        replacements: { Email: email },
        type: QueryTypes.DELETE,
        transaction: t,
      }
    );

    /*console.log(tokendelete);
    if (!tokendelete) {
      await t.rollback();
      return res.send({
        message: "Hiba a refreshtoken törlése során",
        success: false,
      });
    }*/

    await t.commit();
    return res.send({ message: "Sikeres kijelentkezés", success: true });
  } catch (e) {
    console.log(e);
    return res.send({ message: "Kritikus hiba", success: false });
  }
};
exports.refreshtoken = async (req, res) => {
  let token;
  let email;
  try {
    email = req.body.email;
    //console.log(email);
    const { refreshtoken, authtoken } = req.body;
    //console.log(req.body);
    if (!refreshtoken || !authtoken) {
      return res.send({ message: "Nincs token", success: false });
    }
    const tokenvalidálás = jwt.verify(authtoken, process.env.ACCESS_TOKEN_KEY);
    //console.log(tokenvalidálás);
    if (tokenvalidálás) {
      return res.send({ token: authtoken, success: true, changed: false });
    }
    const data = jwt.verify(refreshtoken, process.env.REFRESS_TOKEN_KEY);
    if (!data) {
      return res.send({ message: "Hibási refreshtoken", success: false });
    }
    const reftoken = await sequelize.query(
      "SELECT email,refreshtoken FROM refreshtoken WHERE refreshtoken=:Token",
      {
        replacements: { Token: refreshtoken },
        type: QueryTypes.SELECT,
      }
    );
    if (!reftoken) {
      return res.send({
        message: "Nincs ilyen refreshtoken az adatbázisban",
        success: false,
      });
    }
    token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "20m",
    });
    if (!token) {
      return res.send({
        message: "Hiba a token generálása során",
        success: false,
      });
    }

    return res.send({ token: token, success: true });
  } catch (e) {
    console.log(e);
    token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "20m",
    });
    if (!token) {
      return res.send({
        message: "Hiba a token generálása során",
        success: false,
      });
    }
    //console.log("az új token: " + token);
    return res.send({
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
    const vane_user = await sequelize.query(
      "SELECT email FROM users WHERE email=:Email",
      {
        replacements: { Email: email },
        type: QueryTypes.SELECT,
      }
    );
    if (vane_user.length != 0) {
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
