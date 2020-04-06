const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

mongoose.model("Attribute", AttributeSchema);