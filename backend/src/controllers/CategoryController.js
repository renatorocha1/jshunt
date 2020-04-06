const mongoose = require("mongoose");
const CategoryModel = mongoose.model("Category");

module.exports = {
  async index (req, res) {
    const { game } = req.params;
    try {
      const category = await CategoryModel.find({ game });
      return res.send(category);
    } catch (error) {
      return res.status(400).send({ error: "Error not found category by game" });
    }
  },
  async store(req, res) {
    const game = req.params.game;
    const { title } = req.body;
    try {
      const category = await CategoryModel.create({
        title,
        game
      });
      return res.status(201).send(category);
    } catch (error) {
      return res.status(400).send({ error: "Error creating category" });
    }
  },
  async show(req, res) {
    try {
      const category = await CategoryModel.findById(req.params.id);
      if(!category)
        return res.status(404).send({ error: "Not found category" });
      return res.send(category);
    } catch (error) {
      return res.status(400).send({ error : "Error getting category" });
    }
  },
  async update(req, res){
    const { title } = req.body;
    try {
      const category = await CategoryModel.findByIdAndUpdate(req.params.id, {
        title
      });
      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error updating category" });
    }
  },
  async destroy(req, res){
    try {
      const category = await CategoryModel.findById(req.params.id);
      if(!category)
        return res.status().send({ error: "Not found category" });
      category.remove();
      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error removing category" });
    }
  }
}