const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const config = process.env;

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, path.resolve(__dirname, "..", "..", "temp", "uploads"));
    },
    filename: (req, file, callBack) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callBack(err);
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        callBack(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new AWS.S3(),
    bucket: config.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, callBack) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callBack(err);
        const fileName = `${hash.toString("hex")}-${file.originalname}`;
        callBack(null, fileName);
      });
    }
  }),
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "temp", "uploads"),
  storage: storageTypes[config.APP_STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, callBack) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif",
    ];
    if (allowedMimes.includes(file.mimetype)) {
      callBack(null, true);
    } else {
      callBack(new Error("Invalid file type."));
    }
  },
};