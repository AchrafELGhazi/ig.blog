const express = require('express');
const { Router } = express;
const userRouter = Router();
const verifyToken = require('../middlewares/verifyToken');
const { getUserInfo } = require('../controllers/user.controller');

userRouter.get('/', verifyToken, getUserInfo);

module.exports = userRouter;
