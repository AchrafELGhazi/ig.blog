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
const bodyParser = require('body-parser');


const app = express();




const uploadMiddleware = multer({ dest: 'uploads/' });

// for password encryption using bcrypt
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('B4c0//', salt);
const secret = 'dfsfdfgddfhgb443';

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// This code handles user registration via a POST request to '/register'
app.post('/register', async (req, res) => {
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
});

app.post('/Login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
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

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (error, info) => {
    if (error) throw error;
    const { title, summary, content } = req.body;
    const blogDoc = await Blog.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(blogDoc);
  });
});

app.put('/editBlog', uploadMiddleware.single('Image'), async (req, res) => {
  let newPath = null;

  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      await fs.promises.rename(path, newPath); // Use async version
    }

    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, secret, {}, async (error, info) => {
      if (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      const { title, summary, content, id } = req.body;
      if (!id || !title || !summary || !content) {
        return res
          .status(400)
          .json({ message: 'Bad Request: Missing required fields' });
      }

      const blogDoc = await Blog.findById(id);
      if (!blogDoc) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      const isAuthor =
        JSON.stringify(blogDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      await blogDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : blogDoc.cover,
      });

      res.json({ message: 'Blog updated successfully', blogDoc });
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

app.delete('/deleteBlog/:id', async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secret, {}, async (error, info) => {
    if (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    try {
      const blogDoc = await Blog.findById(id);
      if (!blogDoc) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      const isAuthor = JSON.stringify(blogDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      await Blog.findByIdAndDelete(id);
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  });
});

app.get('/getBlogs', async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
});

app.get(`/Blog/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const blogDoc = await Blog.findById(id)
      .populate('author', ['username'])
      .lean();
    if (!blogDoc) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blogDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/changePassword', async (req, res) => {
  const { oldPassword, newPassword, confirmPassword, id } = req.body;

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
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

