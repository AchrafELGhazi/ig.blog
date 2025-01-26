const express = require('express');
const blogRouter = require('./blogs.routes');
const commentRouter = require('./comments.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const { Router } = express;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const apiRouter = Router();

apiRouter.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
apiRouter.use(express.json());
apiRouter.use(cookieParser());
apiRouter.use('/uploads', express.static(__dirname + '/../../uploads'));
apiRouter.use(bodyParser.json());
apiRouter.use(bodyParser.urlencoded({ extended: true }));

apiRouter.get('/', (req, res) =>
  res.status(200).send('IG.Blog API running...')
);
apiRouter.use('/Blogs', blogRouter);
apiRouter.use('/Blogs/Comments', commentRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);

module.exports = apiRouter;
