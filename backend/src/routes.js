const express = require("express");
const routes = express.Router();

const GameController = require("./controllers/GameController");

routes.get('/games', GameController.index);

module.exports = routes;