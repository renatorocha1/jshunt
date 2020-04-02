const express = require("express");
const routes = express.Router();
const authMiddleware = require("./middlewares/auth");

const GameController = require("./controllers/GameController");
const AuthController = require("./controllers/AuthController");

routes.get('/games', authMiddleware, GameController.index);
routes.post('/login', AuthController.index);
routes.post('/register', AuthController.store);

module.exports = routes;