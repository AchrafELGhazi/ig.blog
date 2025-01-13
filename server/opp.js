const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares/verifyToken');

const app = express();

// Security configuration
const salt = bcrypt.genSaltSync(10); // Generate salt for password hashing
const secret = 'dfsfdfgddfhgb443'; // Secret key for JWT (should be in .env)

// Middleware setup
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

// Database connection
mongoose.connect(process.env.MONGODB_URI);

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password, email, bio, preferences, img } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json('Username or email already exists');
    }

    // Create new user
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt), // Fix: Use salt instead of hash
      bio,
      email,
      preferences,
      img,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user in database
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json('User not found');
    }

    // Verify password
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(400).json('Invalid password');
    }

    // Generate JWT token
    jwt.sign(
      { username, id: userDoc._id },
      secret,
      { expiresIn: '1d' }, // Token expires in 1 day
      (error, token) => {
        if (error) throw error;

        // Send user data and token
        res
          .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          })
          .json({
            id: userDoc._id,
            username,
            email: userDoc.email,
            bio: userDoc.bio,
            preferences: userDoc.preferences,
            img: userDoc.img,
          });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile endpoint - protected by verifyToken middleware
app.get('/profile', verifyToken, (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (error, userData) => {
      if (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      res.json(userData);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  res
    .cookie('token', '', {
      
      httpOnly: true,
    })
    .json('Logged out successfully');
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
