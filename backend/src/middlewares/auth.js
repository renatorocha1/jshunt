const jwt = require("jsonwebtoken");
const authConfig = require("./../config/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: 'Not token provided' });
  
  const [schema, token] = authHeader.split(' ');
  
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if(err) return res.status(401).send({ error: 'Token invalid' });
    
    req.userId = decoded.id;
    return next();
  }); 
}