const http = require('http'); // http is a core module in node.js

// http.createServer() is a function that takes a callback function as an argument
// http.createServer() is a function that creates an http server
// http.createServer() creates a server object
const server = http.createServer((req, res) => {
  console.log(req);

});

// server.listen() is a function that listens for requests on a specified port
// server.listen() is a function that takes a port number as an argument
// server.listen() is a function that takes a hostname as an argument
// server.listen() is a function that takes a callback function as an argument
// server.listen() is a function that listens for requests on a specified port and hostname
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});

