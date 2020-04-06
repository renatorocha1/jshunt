const mongoose = require("mongoose");

const CategoryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  attributes: []
});

mongoose.model("CategoryItem", CategoryItemSchema);