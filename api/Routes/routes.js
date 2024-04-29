const express = require("express");
const routes = express.Router();

const authController = require("../Controller/auth.Controller");
const authMiddleware = require("../Middlewares/auth.Middleware");
const adminController = require("../Controller/admin.Controller");

routes.post("/login", authController.login);
routes.post("/reg", authController.register);
routes.get("/getusers", [authMiddleware.auth], adminController.getusers);

module.exports = routes;
