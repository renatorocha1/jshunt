const config = process.env;
const mongoose = require("mongoose");
const AWS = require("aws-sdk");

const s3 = new AWS.S3();

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatarName: {
    type: String,
    required: true,
  },
  avatarKey: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

GameSchema.pre("save", function(){
  if(!this.avatarUrl) 
    this.avatarUrl = `${config.APP_URL}:${config.APP_PORT}/files/${this.avatarKey}`;
});

GameSchema.pre("remove", function(){
  if(config.APP_STORAGE_TYPE === "s3"){
    return s3.deleteObject({
      Bucket: config.AWS_BUCKET_NAME,
    });
  }
});

mongoose.model('Game', GameSchema);