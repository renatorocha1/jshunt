const mongoose = require("mongoose");
const CategoryItem = mongoose.model("CategoryItem");

module.exports = {
  async index(req, res){
    const { category } = req.params;
    try {
      const items = await CategoryItem.find({ category });
      return res.send(items);
    } catch (error) {
      return res.status(400).send({ error: "Error getting category items" });
    }
  },
  async store(req, res){
    const { category } = req.params;
    const { title, attributes } = req.body;
    const {
      originalname: avatarName,
      key: avatarKey,
      location: avatarUrl = "",
    } = req.file;

    try {
      const item = await CategoryItem.create({
        category,
        title,
        avatarName,
        avatarKey,
        avatarUrl,
        attributes
      });
      return res.status(201).send(item);
    } catch (error) {
      return res.status(400).send({ error: "Error creating category item" });
    }
  },
  async show(req, res){
    const { id } = req.params;
    try {
      const item = await CategoryItem.findById(id);

      if(!item)
        return res.status(404).send({ error: "Not found category item" });
        
      return res.send(item);
    } catch (error) {
      return res.status(400).send({ error: "Error getting category item" });
    }
  },
  async update(req, res){
    const { id } = req.params;
    const { title, category, attributes } = req.body;
    const {
      originalname: avatarName,
      key: avatarKey,
      location: avatarUrl = "",
    } = req.file;

    try {
      const item = await CategoryItem.findById(id);

      if(!item)
        return res.status(404).send({ error: "Not found category item" });

      await item.update({
        category,
        title,
        avatarName,
        avatarKey,
        avatarUrl,
        attributes
      });

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error updating category item" });
    }
  },
  async destroy(req, res){
    const { id } = req.params;
    try {
      const item = await CategoryItem.findById(id);
      
      if(!item)
        return res.status(404).send({ error: "Not found category item" });
      
      await item.remove();
      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Error deleting category item" });
    }
  }
}