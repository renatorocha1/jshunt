require("dotenv").config();
const requireDir = require("require-dir");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const config = process.env;

const url_connection = config.DB_USER && config.DB_PASS ? `mongodb://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}` : `mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;

mongoose.connect(url_connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
requireDir("./models");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api", require("./routes"));
app.use("/files", express.static(path.resolve(__dirname, "..", "temp", "uploads")));
app.listen(config.APP_PORT);