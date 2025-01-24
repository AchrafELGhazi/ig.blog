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

const uploadMiddleware = multer({
  dest: 'uploads/',
  limits: {
    fieldSize: 100 * 1024 * 1024,
  },
});

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
});

app.get('/profile', verifyToken, (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (error, data) => {
    if (error) throw error;
    res.json(data);
  });
});

app.post('/logout', (req, res) => {
  res
    .clearCookie('token', {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      path: '/',
    })
    .json('Logged out successfully');
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

app.post('/createPost', uploadMiddleware.single('Image'), async (req, res) => {
  console.log(req.body)
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;

  jwt.verify(token, secret, {}, async (error, info) => {
    if (error) throw error;
    const { title, summary, content, tags } = req.body;
    const tagsArray = tags.split(',').map(tag => tag.trim());

    const blogDoc = await Blog.create({
      title,
      summary,
      content,
      tags:tagsArray,
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

app.delete('/Blog/deleteBlog/:id', async (req, res) => {
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

      const isAuthor =
        JSON.stringify(blogDoc.author) === JSON.stringify(info.id);
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

app.post('/Blog/:id/likeBlog', async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (error, data) => {
    if (error) throw error;

    const blogDoc = await Blog.findById(id);
    if (!blogDoc) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const userId = data.id;
    const userLikeIndex = blogDoc.likes.indexOf(userId);
    if (userLikeIndex === -1) {
      blogDoc.likes.push(userId);
    } else {
      blogDoc.likes.splice(userLikeIndex, 1);
    }

    await blogDoc.save();

    res.json({
      likes: blogDoc.likes,
      likeCount: blogDoc.likes.length,
      message:
        userLikeIndex === -1
          ? 'Blog liked successfully'
          : 'Blog unliked successfully',
    });
  });
});




// Add comment route
app.post('/Blog/postComment/:blogId', async (req, res) => {
  try {
    // 1. Get parameters and body
    const { blogId } = req.params;
    const { comment } = req.body;
    const { token } = req.cookies;

    // 2. Validate inputs
    if (!comment || comment.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to comment' });
    }

    // 3. Verify token and get user ID
    let userId;
    try {
      const verified = jwt.verify(token, secret);
      userId = verified.id;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // 4. Find the blog and add comment
    const blogDoc = await Blog.findById(blogId);
    if (!blogDoc) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // 5. Add the new comment
    blogDoc.comments.push({
      user: userId,
      content: comment.trim(),
      replies: [],
    });

    // 6. Save the updated blog
    await blogDoc.save();

    // 7. Fetch the updated blog with populated user data
    const updatedBlog = await Blog.findById(blogId)
      .populate('comments.user', 'username')
      .populate('comments.replies.user', 'username');

    // 8. Get the newly added comment
    const newComment = updatedBlog.comments[updatedBlog.comments.length - 1];

    // 9. Send response
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({
      message: 'Error posting comment',
      error: error.message,
    });
  }
});


app.get('/Blog/getComments/:blogId', async (req, res) => {
  try {
    const { blogId } = req.params;

    // Find the blog and populate user data for comments and replies
    const blog = await Blog.findById(blogId)
      .populate('comments.user', 'username') // Populate comment author data
      .populate('comments.replies.user', 'username') // Populate reply author data
      .select('comments'); // Only select the comments field

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Return the comments array
    res.json({
      comments: blog.comments
    });

  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ 
      message: 'Error fetching comments',
      error: error.message 
    });
  }
});






// Handle reply to a comment
app.post('/Blog/:blogId/replyComment/:commentId', async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { content } = req.body;
    const { token } = req.cookies;

    // Validate inputs
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Reply content is required' });
    }

    if (!token) {
      return res.status(401).json({ message: 'You must be logged in to reply' });
    }

    // Verify token and get user ID
    let userId;
    try {
      const verified = jwt.verify(token, secret);
      userId = verified.id;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Find the blog and the comment to reply to
    const blogDoc = await Blog.findById(blogId);
    if (!blogDoc) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const comment = blogDoc.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Add the reply to the comment
    comment.replies.push({
      user: userId,
      content: content,
    });

    await blogDoc.save();

    const updatedBlog = await Blog.findById(blogId)
      .populate('comments.user', 'username')
      .populate('comments.replies.user', 'username');

    const newReply = comment.replies[comment.replies.length - 1];
    res.status(201).json(newReply);
  } catch (error) {
    console.error('Error replying to comment:', error);
    res.status(500).json({
      message: 'Error replying to comment',
      error: error.message,
    });
  }
});


app.delete('/Blog/:blogId/deleteComment/:commentId', async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'You must be logged in to delete a comment' });
    }

    // Verify token and get user ID
    let userId;
    try {
      const verified = jwt.verify(token, secret);
      userId = verified.id;
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Find the blog and the comment to delete
    const blogDoc = await Blog.findById(blogId);
    if (!blogDoc) {
      return res.status(404).json({ message: 'Blog not found with the given ID' });
    }

    const comment = blogDoc.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found with the given ID' });
    }

    // Check if the user is the author of the comment
    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    blogDoc.comments.pull(commentId);
    await blogDoc.save();

    res.status(200).json({ message: 'Comment deleted successfully', commentId });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      message: 'Error deleting comment',
      error: error.message,
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
