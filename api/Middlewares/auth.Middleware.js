const jwt = require("jsonwebtoken");
const sequelize = require("../Models/dbModell");
const { QueryTypes } = require("sequelize");
exports.auth = async (req, res, next) => {
  try {
    const authtoken = req.headers.authtoken
      ? req.headers.authtoken
      : req.headers.authorization.split(" ")[1];
    /*if (cookies.get("userData") && authtoken != null) {
      const user = await sequelize.query(
        "SELECT ID, username, name, email,admin FROM users WHERE email=:Email",
        {
          replacements: { Email: cookies.get("userData").email },
          type: QueryTypes.SELECT,
        }
      );
      if (!user) {
        return res.send({ message: "Nincs ilyen felhasználó", success: false });
      }
    }*/
    if (!authtoken) {
      return res.send({ message: "Nincs token", success: false });
    }
    const data = jwt.verify(authtoken, process.env.ACCESS_TOKEN_KEY);
    if (!data) {
      return res.send({ message: "Hibás token", success: false });
    }
    const user = await sequelize.query(
      "SELECT ID, username, name, email,admin FROM users WHERE email=:Email",
      {
        replacements: { Email: data.email },
        type: QueryTypes.SELECT,
      }
    );
    if (!user) {
      return res.send({ message: "Nincs ilyen felhasználó", success: false });
    }
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    return res.send({ message: "Lejárt a token", success: false });
  }
};
