const express = require("express");
const routes = express.Router();

const authController = require("../Controller/auth.Controller");
const authMiddleware = require("../Middlewares/auth.Middleware");

routes.post("/login", authController.login);
routes.post("/reg", authController.register);

module.exports = routes;
