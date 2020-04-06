const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryItem"
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("Category", CategorySchema);