const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile('./views/about.html', { root: __dirname });
});

app.get;

// redirects
app.get('/about-us', (req, res) => {
  // res.redirect('/about');
  res.redirect(301, '/about');
});

// 404 page
app.use((req, res) => { // app.use() is a function that runs for every request that does not match any of the routes
  // res.status(404).send('<p>404 page does not exist</p>');
  res.status(404).sendFile('./views/404.html', { root: __dirname }); // res.status() is a function that sets the status code of the response 
});