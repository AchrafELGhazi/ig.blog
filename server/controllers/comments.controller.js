require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');

const secret = process.env.JWT_SECRET;

const postComment = async (req, res) => {
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
};

const getComments = async (req, res) => {
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
      comments: blog.comments,
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      message: 'Error fetching comments',
      error: error.message,
    });
  }
};

const replyComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { content } = req.body;
    const { token } = req.cookies;

    // Validate inputs
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Reply content is required' });
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to reply' });
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
};
const deleteComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to delete a comment' });
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
      return res
        .status(404)
        .json({ message: 'Blog not found with the given ID' });
    }

    const comment = blogDoc.comments.id(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Comment not found with the given ID' });
    }

    // Check if the user is the author of the comment
    if (comment.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not authorized to delete this comment' });
    }

    blogDoc.comments.pull(commentId);
    await blogDoc.save();

    res
      .status(200)
      .json({ message: 'Comment deleted successfully', commentId });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      message: 'Error deleting comment',
      error: error.message,
    });
  }
};

module.exports = { postComment, getComments, replyComment,deleteComment };
