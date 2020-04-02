const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const config = require("../config.json");

const transport = nodemailer.createTransport({
  host: config.mailerHost,
  port: config.mailerPost,
  auth: {
    user: config.mailerUser,
    pass: config.mailerPass
  }
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve("./src/resources/mail/"),
      layoutsDir: path.resolve("./src/resources/mail/"),
      defaultLayout: "auth/forgot_password.html"
    },
    viewPath: path.resolve("./src/resources/mail/"),
    extName: ".html"
  })
);

module.exports = transport;