const express = require('express');
const Router = express;
const commentRouter = Router();

const {
  postComment,
  getComments,
  replyComment,
  deleteComment,
} = require('../controllers/comments.controller');



commentRouter.post('/postComment/:blogId', postComment);
commentRouter.get('/getComments/:blogId', getComments);
commentRouter.post('/:blogId/replyComment/:commentId', replyComment);
commentRouter.delete('/:blogId/deleteComment/:commentId', deleteComment);

module.exports = commentRouter;
