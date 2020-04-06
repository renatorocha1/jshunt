const jwt = require("jsonwebtoken");
const { APP_HASH } = process.env;

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(401).send({ error: 'Not token provided' });
  
  const [schema, token] = authHeader.split(' ');
  
  jwt.verify(token, APP_HASH, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token invalid" });

    req.userId = decoded.id;
    return next();
  }); 
}