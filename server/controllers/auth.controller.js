require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// for password encryption using bcrypt
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0//', salt);
const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { username, password, email, bio, preferences, img } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, hash),
      bio,
      email,
      preferences,
      img,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(404).json(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json('Username and password are required');
    }

    // Find user
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json('User not found');
    }

    // Check password
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(400).json('Wrong credentials');
    }

    // Create token with expiration
    jwt.sign(
      { username, id: userDoc._id },
      secret,
      { expiresIn: '24h' }, // Token expires in 24 hours
      (error, token) => {
        if (error) {
          console.error('JWT Error:', error);
          return res.status(500).json('Error creating token');
        }

        res
          .cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
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
    console.error('Login error:', error);
    res.status(500).json('Internal server error');
  }
};

const logout = (req, res) => {
  res
    .clearCookie('token', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      path: '/',
    })
    .json('Logged out successfully');
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword, id } = req.body;
  console.log(req.body)

  if (!oldPassword || !newPassword || !confirmPassword || !id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'New passwords do not match' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  changePassword,
};
