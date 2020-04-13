const mongoose = require("mongoose");
const Weapon = mongoose.model("Weapon");

module.exports = {
  async index(req, res){
    try {
      const weapons = await Weapon.find();
      return res.send(weapons);
    } catch (error) {
      return res.status(400).send({ error: "Error getting weapons" });
    }
  },
  async store(req, res){
    const { game } = req.params;
    const { title, attributes } = req.body;
    const {
      originalname: avatarName,
      key: avatarKey,
      location: avatarUrl = "",
    } = req.file;

    try {
      const weapon = await Weapon.create({
        game,
        title,
        avatarName,
        avatarKey,
        avatarUrl,
        attributes
      });
      return res.status(201).send(weapon);
    } catch (error) {
      return res.status(400).send({ error: "Error creating weapon" });
    }
  },
  async show(req, res){
    const { id } = req.params;
    try {
      const weapon = await Weapon.findById(id);
      if(!weapon){
        return res.status(404).send({ error: "Not found weapon" });
      }
        
      return res.send(weapon);
    } catch (error) {
      return res.status(400).send({ error: "Error getting weapon" });
    }
  },
  async update(req, res){
    const { id } = req.params;
    const { title, game, attributes } = req.body;
    const {
      originalname: avatarName,
      key: avatarKey,
      location: avatarUrl = "",
    } = req.file;

    try {
      const weapon = await Weapon.findById(id);

      if(!weapon){
        return res.status(404).send({ error: "Not found weapon" });
      }

      await weapon.update({
        game,
        title,
        avatarName,
        avatarKey,
        avatarUrl,
        attributes
      });

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error updating weapon" });
    }
  },
  async destroy(req, res){
    const { id } = req.params;
    try {
      const weapon = await Weapon.findById(id);
      
      if(!weapon){
        return res.status(404).send({ error: "Not found weapon" });
      }
      
      await weapon.remove();
      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error deleting weapon" });
    }
  }
}