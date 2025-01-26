const Blog = require('../models/blog');
const fs = require('fs');
require('dotenv').config();
const secret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const createBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (error, info) => {
      if (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { title, summary, content, tags } = req.body;
      const tagsArray = tags.split(',').map(tag => tag.trim());

      try {
        const blogDoc = await Blog.create({
          title,
          summary,
          content,
          tags: tagsArray,
          cover: newPath,
          author: info.id,
        });

        res.json(blogDoc);
      } catch (createError) {
        console.error('Error creating blog:', createError);
        res.status(500).json({ message: 'Error creating blog' });
      }
    });
  } catch (error) {
    console.error('Error in createBlog route:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const editBlog = async (req, res) => {
  let newPath = null;

  try {
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      await fs.promises.rename(path, newPath);
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
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.log(err);
  }
};

const deleteBlog = async (req, res) => {
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
};

const getSingleBlog = async (req, res) => {
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
};

const likeBlog = async (req, res) => {
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
};

module.exports = {
  createBlog,
  editBlog,
  getBlogs,
  deleteBlog,
  getSingleBlog,
  likeBlog,
};