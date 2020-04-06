const express = require("express");
const multer = require("multer");
const multerConfig = require("./modules/multer");
const requireDir = require("require-dir");
const routes = express.Router();
const controllers = requireDir("./controllers");
const authMiddleware = require("./middlewares/auth");

routes.get("/games", authMiddleware, controllers.GameController.index);
routes.post("/games", authMiddleware, multer(multerConfig).single("file"), controllers.GameController.store);
routes.get("/games/:id", authMiddleware, controllers.GameController.show);
routes.delete("/games/:id", authMiddleware, controllers.GameController.destroy);

routes.post('/login', controllers.AuthController.index);
routes.post('/register', controllers.AuthController.store);
routes.post("/forgot-password", controllers.AuthController.forgot);
routes.post("/reset-password", controllers.AuthController.reset);

module.exports = routes;