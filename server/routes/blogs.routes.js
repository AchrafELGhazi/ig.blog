const express = require('express');
const { Router } = express;
const uploadMiddleware = require('../middlewares/uploadMulter');
const blogRouter = Router();

const {
  createBlog,
  editBlog,
  getBlogs,
  deleteBlog,
  getSingleBlog,
  likeBlog,
} = require('../controllers/blog.controller');

blogRouter.post('/createBlog', uploadMiddleware.single('Image'), createBlog);
blogRouter.put('/editBlog', uploadMiddleware.single('Image'), editBlog);
blogRouter.get('/getBlogs', getBlogs);
blogRouter.delete('/deleteBlog/:id', deleteBlog);
blogRouter.get(`/:id`, getSingleBlog);
blogRouter.post('/:id/likeBlog', likeBlog);

module.exports = blogRouter;
