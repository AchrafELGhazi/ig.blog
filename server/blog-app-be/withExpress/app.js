const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
    'mongodb+srv://achraf_11:ACIen1.2021k@cluster0.qnc1h.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0';

  mongoose
    .connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

//   --------------------------BEFORE MVC--------------------------

// const express = require('express');
// const requestLogger = require('./middlewares/requestLogger');
// const inTheNextMiddleware = require('./middlewares/inTheNextMiddleware');
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const Blog = require('./models/blog');

// // express app
// const app = express();

// // connect to mongodb & listen for requests
// const dbURI =
//   'mongodb+srv://achraf_11:ACIen1.2021k@cluster0.qnc1h.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0';
// mongoose
//   .connect(dbURI) // mongoose.connect() is a function that connects to a MongoDB database
//   // mongoose.connect() returns a promise
//   .then(result => app.listen(3000))
//   .catch(err => console.log(err));

// // register view engine
// app.set('view engine', 'ejs'); // app.set() is a function that sets a value for a given key

// // listen for requests
// // app.listen(3000);

// // middleware & static files
// app.use(express.static('public')); // express.static() is a function that serves static files such as images, CSS files, and JavaScript files
// app.use(express.urlencoded({ extended: true })); // express.urlencoded() is a function that parses incoming requests with urlencoded payloads
// // when use express.urlencoded() we can access the form data in the request object using req.body
// app.use(morgan('dev')); // morgan is a middleware that logs information about the request

// // mongoose and mongo sandbox routes
// // app.get('/add-blog', (req, res) => {
// //   const blog = new Blog({
// //     title: 'new blog 2q',
// //     snippet: 'about my new blog',
// //     body: 'more about my new blog',
// //   });

// //   blog
// //     .save() // save() is a function that saves a document to a MongoDB collection
// //     .then(result => {
// //       res.send(result); // res.send() is a function that sends a response to the client
// //     })
// //     .catch(err => {
// //       console.log(err);
// //     });
// // });

// // app.get('/all-blogs', (req, res) => {
// //   Blog.find() // find() is a function that returns all documents in a MongoDB collection
// //     .then(result => {
// //       res.send(result);
// //     })
// //     .catch(err => {
// //       console.log(err);
// //     });
// // });

// // app.get('/single-blog', (req, res) => {
// //   Blog.findById('67810afc07bc6aacb616e367') // findById() is a function that returns a document by its id
// //     .then(result => {
// //       res.send(result);
// //     })
// //     .catch(err => {
// //       console.log(err);
// //     });
// // });

// app.get('/', (req, res) => {
//   res.redirect('/blogs'); // res.redirect() is a function that redirects the client to a different URL
// });

// // app.use(inTheNextMiddleware);

// app.get('/about', (req, res) => {
//   // res.send('<p>about page</p>');
//   res.render('about', { title: 'About' });
// });

// // Blog routes
// app.get('/blogs', (req, res) => {
//   // Use the Blog model to find all blog documents in the database
//   Blog.find()
//     .sort({ createdAt: -1 }) // sort() is a function that sorts the documents in a MongoDB collection // -1 is used to sort in descending order
//     .then(result => {
//       // If successful, render the 'index' view with the retrieved blogs from result as the value of the blogs key
//       res.render('index', { title: 'All blogs', blogs: result });
//     })
//     .catch(err => {
//       // If an error occurs, log the error to the console
//       console.log(err);
//     });
// });

// app.post('/blogs', (req, res) => {
//   const blog = new Blog(req.body);
//   blog
//     .save() // save() is a function that saves a document to a MongoDB collection
//     .then(result => {
//       res.redirect('/blogs');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/blogs/:id', (req, res) => {
//   const id = req.params.id; // req.params is an object that contains the values of the named route parameters
//   Blog.findById(id)
//     .then(result => {
//       res.render('details', { blog: result, title: 'Blog Details' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.delete('/blogs/:id', (req, res) => {
//   const id = req.params.id;
//   Blog.findByIdAndDelete(id)
//     .then(result => {
//       res.json({ redirect: '/blogs' });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'Create a new blog' });
// });

// // redirects
// // app.get('/about-us', (req, res) => {
// //   // res.redirect('/about');
// //   res.redirect(301, '/about');
// // });

// // 404 page
// app.use((req, res) => {
//   // app.use() is a function that runs for every request that does not match any of the routes
//   // res.status(404).send('<p>404 page does not exist</p>');
//   res.status(404).render('404', { title: '404' }); // res.status() is a function that sets the status code of the response
// });
