
const fs = require('fs'); //built-in module in Node.js that provides file system-related utility methods and properties

// reading files
fs.readFile('./docs/blog1.txt', (error, data) => {
  if(error){
    console.log(error);
  }
  console.log(data.toString());
});




// writing files
fs.writeFile('./docs/blog2.txt', 'hello, world', () => {
  console.log('file was written');
});



// directories operations

// Check if the 'assets' directory exists
if (!fs.existsSync('./assets')) {
  // If the 'assets' directory does not exist, create it
  fs.mkdir('./assets', (error) => {
    if (error) {
      console.log(error); // Log any errors that occur during directory creation
    }
    console.log('folder created'); // Log a message indicating the directory was created
  });
} else {
  // If the 'assets' directory exists, remove it
  fs.rmdir('./assets', (error) => {
    if (error) {
      console.log(error); // Log any errors that occur during directory removal
    }
    console.log('folder deleted'); // Log a message indicating the directory was deleted
  });
}

// deleting files
if(fs.existsSync('./docs/deleteme.txt')){
  fs.unlink('./docs/deleteme.txt', (error) => {
    if(error){
      console.log(error);
    }
    console.log('file deleted');
  });
} else {
  console.log('no such file');
}
