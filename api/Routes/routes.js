const express = require("express");
const routes = express.Router();

const authController = require("../Controller/auth.Controller");
const authMiddleware = require("../Middlewares/auth.Middleware");
const adminController = require("../Controller/admin.Controller");

const userController = require("../Controller/user.Controller");

routes.post("/login", authController.login);
routes.post("/reg", authController.register);
routes.get("/getusers", [authMiddleware.auth], adminController.getusers);
routes.post("/logout", authController.logout);
routes.post("/refreshtoken", authController.refreshtoken);

routes.get(
  "/getallKosarasok",
  [authMiddleware.auth],
  userController.getallKosarasok
);

module.exports = routes;
