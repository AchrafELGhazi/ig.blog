const http = require('http'); // http is a core module in node.js
const fs = require('fs'); // fs is a core module in node.js

// http.createServer() is a function that takes a callback function as an argument
// http.createServer() is a function that creates an http server
// http.createServer() creates a server object
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // set header content type // res.setHeader() is a function that sets the header of the response object // res.setHeader() is a function that takes a header name and a header value as arguments
  res.setHeader('Content-Type', 'text/html ');

  // node.js routing
  let path = './views'; // path is a variable that stores a string

  // switch statement
  switch (req.url) {
    case '/':
      path += '/index.html';
      res.statusCode = 200; // res.statusCode is a property that sets the status code of the response object
      break;

    case '/about':
      path += '/about.html';
      res.statusCode = 200;
      break;

    case '/about-me':
      res.statusCode = 301; // res.statusCode is a property that sets the status code of the response object
      res.setHeader('Location', '/about'); // setHeaders names: Location, Content-Type, Set-Cookie
      res.end(); // res.end() is a function that ends the response process
      break;
    
    default:
      path += '/404.html';
      res.statusCode = 404;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });

  // send an html file
  // fs.readFile('./views/index.html', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.end();
  //   } else {
  //     // res.write(data); // res.write() is a function that writes a response to the client
  //     res.end(data); // res.end() is a function that ends the response process
  //   }
  // });
});

// server.listen() is a function that listens for requests on a specified port
// server.listen() is a function that takes a port number as an argument
// server.listen() is a function that takes a hostname as an argument
// server.listen() is a function that takes a callback function as an argument
// server.listen() is a function that listens for requests on a specified port and hostname
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});

// status codes
// 200 - OK       /////////////////////////////////////////
// 301 - Resource moved permanently      /////////////////////////////////////////
// 404 - Not found      /////////////////////////////////////////
// 500 - Internal server error      /////////////////////////////////////////
// 304 - Not modified
// 400 - Bad request
// 403 - Forbidden
// 503 - Service unavailable
// 401 - Unauthorized
// 201 - Created
// 202 - Accepted
// 204 - No content
// 206 - Partial content

// status codes ranges --->
// 1xx - Informational responses
// 2xx - Success codes
// 3xx - Redirection codes
// 4xx - User or Client error codes
// 5xx - Server error codes