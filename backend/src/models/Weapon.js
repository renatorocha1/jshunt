const mongoose = require("mongoose");

const WeaponSchema = new mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
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
    type: JSON,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Weapon", WeaponSchema);