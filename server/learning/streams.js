const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', {
  encoding: 'utf8',
}); // readStream is an event emitter object  // utf8 is the encoding type

const writeStream = fs.createWriteStream('./docs/blog4.txt'); // writeStream is an event emitter object // blog4.txt will be created
// if blog4.txt already exists, it will be overwritten

readStream.on('data', chunk => {
  console.log('---------NEW CHUNK----------');
  console.log(chunk);
  writeStream.write('\nNEW CHUNK\n');
  writeStream.write(chunk);
  
});

// using pipe method to copy the content of blog3.txt to blog4.txt
readStream.pipe(writeStream); // this will copy the content of blog3.txt to blog4.txt

