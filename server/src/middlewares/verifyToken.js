const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;


function verifyToken(req, res, next) {
  const token = req.cookies.token || req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  const actualToken = token.startsWith('Bearer ')
    ? token.slice(7, token.length)
    : token;

  jwt.verify(actualToken, secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
