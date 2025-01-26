const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is up and running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  });