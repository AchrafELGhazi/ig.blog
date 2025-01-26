require('dotenv').config();
const jwt = require('jsonwebtoken');


const getUserInfo = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (error, data) => {
    if (error) throw error;
    res.json(data);
  });
};



module.exports = {getUserInfo}