const mongoose = require("mongoose");
const Game = mongoose.model("Game");

module.exports = {
  async index(req, res) {
    const games = await Game.find();
    return res.json(games);
  }
}