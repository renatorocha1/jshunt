const express = require("express");
const multer = require("multer");
const multerConfig = require("./modules/multer");
const requireDir = require("require-dir");
const routes = express.Router();
const ctl = requireDir("./controllers");
const authMiddleware = require("./middlewares/auth");

routes.get("/games", ctl.GameController.index);
routes.post("/games", authMiddleware, multer(multerConfig).single("file"), ctl.GameController.store);
routes.get("/games/:id", ctl.GameController.show);
routes.put("/games/:id", authMiddleware, ctl.GameController.update);
routes.delete("/games/:id", authMiddleware, ctl.GameController.destroy);

routes.get("/maps/:game", ctl.MapController.index);
routes.post("/maps/:game", authMiddleware, multer(multerConfig).single("file"), ctl.MapController.store);
routes.get("/map/:id", ctl.MapController.show);
routes.put("/map/:id", authMiddleware, multer(multerConfig).single("file"), ctl.MapController.update);
routes.delete("/map/:id", authMiddleware, ctl.MapController.destroy);

routes.get("/weapons", ctl.WeaponController.index);
routes.post("/weapons/:game", authMiddleware, multer(multerConfig).single("file"), ctl.WeaponController.store);
routes.get("/weapons/:id", ctl.WeaponController.show);
routes.put("/weapons/:id", authMiddleware, multer(multerConfig).single("file"), ctl.WeaponController.update);
routes.delete("/weapons/:id", authMiddleware, ctl.WeaponController.destroy);

routes.post('/login', ctl.AuthController.index);
routes.post('/register', ctl.AuthController.store);
routes.post("/forgot-password", ctl.AuthController.forgot);
routes.post("/reset-password", ctl.AuthController.reset);

module.exports = routes;