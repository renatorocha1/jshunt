const mongoose = require("mongoose");
const config = process.env;

const MapSchema = mongoose.Schema({
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game"
  },
  description: {
    type: String
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
    type: String
  }
});

MapSchema.pre("save", function () {
  if (!this.avatarUrl)
    this.avatarUrl = `${config.APP_URL}:${config.APP_PORT}/files/${this.avatarKey}`;
});

MapSchema.pre("remove", function () {
  if (config.APP_STORAGE_TYPE === "s3") {
    return s3.deleteObject({
      Bucket: config.AWS_BUCKET_NAME,
    });
  }
});

mongoose.model("Map", MapSchema);