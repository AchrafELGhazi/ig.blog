const express = require('express');
const { Router } = express;
const authRouter = Router();

const {
  register,
  login,
  logout,
  changePassword,
} = require('../controllers/auth.controller');

authRouter.post('/register', register);
authRouter.post('/Login', login);
authRouter.post('/logout', logout);
authRouter.post('/changePassword', changePassword);

module.exports = authRouter;
