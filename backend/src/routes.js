const express = require("express");
const requireDir = require("require-dir");
const routes = express.Router();
const controllers = requireDir("./controllers");
const authMiddleware = require("./middlewares/auth");

routes.get("/games", authMiddleware, controllers.GameController.index);
routes.post('/login', controllers.AuthController.index);
routes.post('/register', controllers.AuthController.store);
routes.post("/forgot-password", controllers.AuthController.forgot);
routes.post("/reset-password", controllers.AuthController.reset);

module.exports = routes;