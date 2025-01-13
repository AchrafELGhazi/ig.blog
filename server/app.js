const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');
const multer = require('multer');
const fs = require('fs');
const Blog = require('./models/blog');

const app = express();
const uploadMiddleware = multer({ dest: 'uploads/' });

// for password encryption using bcrypt
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0//', salt);
const secret = 'dfsfdfgddfhgb443';

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI);

// This code handles user registration via a POST request to '/register'
app.post('/register', async (req, res) => {
  // Get username and password that user submitted in request body
  const { username, password, email, bio, preferences, img } = req.body;
  try {
    // Create a new user in the database with this info
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, hash),
      bio,
      email,
      preferences,
      img,
    });
    // Send back the newly created user data as JSON response
    res.json(userDoc);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.post('/Login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
      if (error) {
        throw error;
      }
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
        email: userDoc.email,
        bio: userDoc.bio,
        preferences: userDoc.preferences,
        img: userDoc.img,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', verifyToken, (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (error, data) => {
    if (error) throw error;
    res.json(data);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('Logged out successfully');
});

app.post('/createPost', uploadMiddleware.single('Image'), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const blogDoc = await Blog.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res.json(blogDoc);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
