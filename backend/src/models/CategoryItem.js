const mongoose = require("mongoose");

const CategoryItemSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  avatarName: {
    type: String,
    required: true
  },
  avatarKey: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String,
    required: false
  },
  attributes: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("CategoryItem", CategoryItemSchema);