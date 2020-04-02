const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const UserModel = mongoose.model("User");

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
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
  }
}