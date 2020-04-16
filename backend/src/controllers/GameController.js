const mongoose = require("mongoose");
const GameModel = mongoose.model("Game");
const WeaponModel = mongoose.model("Weapon");
const MapModel = mongoose.model("Map");

module.exports = {
  async index(req, res) {
    const games = await GameModel.find();
    return res.json(games);
  },
  async store(req, res) {
    const { originalname: avatarName, key: avatarKey, location: avatarUrl = "" } = req.file;
    const { title, description } = req.body;
    try {
      const game = await GameModel.create({
        title,
        description,
        avatarName,
        avatarKey,
        createdBy: req.userId,
        avatarUrl,
      });
      return res.json({ game });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Error creating a new game" });
    }
  },
  async show(req, res) {
    const _id = req.params.id;
    try {
      const game = await GameModel.findOne({ _id });
      if(!game){
        return res.status(404).send({ error: "Not found game" });
      }
      const weapons = await WeaponModel.aggregate()
      .group({ 
        _id: "$type",
        game: { $addToSet: "$game"},
        weapons: { $push: "$$ROOT" }
      })
      .exec();
      const categories = weapons.filter(cat => {
        return cat.game[0] == _id;
      });
      const maps = await MapModel.find({ game: game._id });
      
      return res.send({ game, categories, maps } );
    } catch (error) {
      return res.status(400).send({ error: "Error getting game"});
    }
  },
  async update(req, res) {
    const {
      originalname: avatarName,
      key: avatarKey,
      location: avatarUrl = "",
    } = req.file;
    const { title, description } = req.body;
    const id = req.params.id;

    try {
      const game = await GameModel.findById(id);

      if(!game)
        return res.status(404).send({ error: "Not found game"});

      await game.update({
        title,
        description,
        avatarName,
        avatarKey,
        avatarUrl,
      });
      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error getting game"});
    }
  },
  async destroy(req, res) {
    const id = req.params.id;
    try {
      const game = await GameModel.findById(id);
      if (!game) return res.status(404).send({ error: "Not found game" });
      await game.remove();
      res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error removing game" });
    }
  },
};