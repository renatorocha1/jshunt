const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const config = process.env;

const transport = nodemailer.createTransport({
  host: config.MAILER_HOST,
  port: config.MAILER_PORT,
  auth: {
    user: config.MAILER_USER,
    pass: config.MAILER_PASS
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