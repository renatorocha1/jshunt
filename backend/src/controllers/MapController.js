const mongoose = require("mongoose");
const MapModel = mongoose.model("Map");

module.exports = {
  async index(req, res){
    const { game } = req.params;
    const Maps = await MapModel.find({ game });
    return res.send(Maps);
  },
  async store(req, res){
    const { game } = req.params;
    const { description } = req.body;
    const { originalname: avatarName, key: avatarKey, location: avatarUrl = "" } = req.file;
    try {
      const map = await MapModel.create({
        game,
        description,
        avatarName,
        avatarKey,
        avatarUrl
      });
      return res.status(201).send(map);
    } catch (error) {
      return res.status(400).send({ error: "Error creating map"});
    }
  },
  async show(req, res){
    const { id } = req.params;
    try {
      const map = await MapModel.findById(id);
      if(!map)
        return res.status(404).send({ error : "Not found map"});
      return res.send(map);
    } catch (error) {
      return res.status(400).send({ error: "Error getting map" });
    }
  },
  async update(req, res){
    const { id } = req.params;
    const { description, game } = req.body;
    const { originalname: avatarName, key: avatarKey, location: avatarUrl = "" } = req.file;
    try {
      const map = await MapModel.findById(id);

      if(!map)
        return res.status(404).send({ error: "Not found map" });

      await map.update({
        game,
        description,
        avatarName,
        avatarKey,
        avatarUrl,
      });
      return res.send();
    } catch (error) {
      return res.status(400).send({ error : "Error updating map" });
    }
  },
  async destroy(req, res){
    const { id } = req.params;
    try {
      const map = await MapModel.findById(id);
      if(!map)
        return res.status(404).send({ error: "Not found map" });

      await map.delete();
      return res.status(204).send();
    } catch (error) {
      return res.status(400).send({ error: "Error deleting map" });
    }
  }
}