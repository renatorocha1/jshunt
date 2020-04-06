const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { APP_HASH } = process.env;
const mailer = require("../modules/mailer");
const UserModel = mongoose.model("User");

function generateToken(params = {}){
  return jwt.sign(params, APP_HASH, {
    expiresIn: 86400,
  });
}

module.exports = {
  async index(req, res){
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select(["name", "email", "password"]);

    if(!user)
      return res.status(404).send({ error: 'User not found' });

    if(!await bcrypt.compare(password, user.password))
      return res.status(404).send({ error: 'Invalid password' });

    return res.send({ 
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken({ id: user._id })
    });
  },
  async store(req, res){
    const { email } = req.body;
    try {
      if (await UserModel.findOne({ email }))
        return res.status(400).send({ error: 'User already exists' });

      const user = await UserModel.create(req.body);

      return res.send({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken({ id: user._id })
      });
    } catch (error) {
      return res.status(500).send({ error : 'Registration failed' });
    }
  },
  async forgot(req, res){
    const { email } = req.body;
    try {
      const user = await UserModel.findOne({ email });

      if(!user)
        return res.status(404).send({ error: 'User not found'});

      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await UserModel.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      });

      mailer.sendMail({
        to: email,
        from: 'webmaster@jshunt.com',
        template: 'auth/forgot_password',
        context: { token }
      }, (error) => {
        if(error)
          return res.status(500).send({ error: 'Cannot send forgot password email' });
        return res.send();
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: 'Error on forgot password, try again'});
    }
  },
  async reset(req, res){
    const { email, token, password } = req.body;
    try {
      const user = await UserModel.findOne({ email }).select('+passwordResetToken passwordResetExpires');
      if(!user)
        return res.status(404).send({ error: 'User not found' });
      
      if(token !== user.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid' });

      const now = new Date();
      if(now  > user.passwordResetExpires){
        return res.status(400).send({ error: 'Token expired, generate a new one'});
      }

      user.password = password;
      await user.save();

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: 'Cannot reset password, try again' });
    }
  }
}