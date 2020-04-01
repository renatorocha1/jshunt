const requireDir = require("require-dir");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/jshunt",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
requireDir("./src/models");

app.use("/api", require("./src/routes"));
app.listen(3001);