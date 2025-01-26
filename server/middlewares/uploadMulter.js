const express = require('express');
const multer = require('multer')
const uploadMiddleware = multer({
  dest: 'uploads/',
  limits: {
    fieldSize: 100 * 1024 * 1024,
  },
});

module.exports = uploadMiddleware;
