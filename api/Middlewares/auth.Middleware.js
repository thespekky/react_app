const jwt = require("jsonwebtoken");
const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
const Users = require("../Models/User.Modell");
exports.auth = async (req, res, next) => {
  try {
    const authtoken = req.headers.authtoken
      ? req.headers.authtoken
      : req.headers.authorization.split(" ")[1];
    if (!authtoken) {
      return res.status(404).send({ message: "Nincs token", success: false });
    }
    const data = jwt.verify(authtoken, process.env.ACCESS_TOKEN_KEY);
    if (!data) {
      return res
        .status(400)
        .send({ message: "Hibás token/Lejárt token", success: false });
    }
    const user = await Users.findOne({
      where: {
        email: data.email,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ message: "Nincs ilyen felhasználó", success: false });
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    return res.status(200).send({
      message: "Lejárt a token töltse újra az oldalt",
      success: false,
    });
  }
};
