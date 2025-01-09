// we can do this
// const { people } = require('./people');  here we dont have access to the ages array
//or this
// const { people, ages } = require('./people'); here we have access to both the people and ages arrays

// Importing the 'people' module using require
const xyz = require('./people'); //runs the people.js file and returns the module.exports object
// here we have access to the whole thing

console.log(xyz); //logs the module.exports object from the people.js file to the console
// module.exports is an object that is created by Node.js and is used
// to define what should be exported from a file. When we require a file in another file,
// the module.exports object is returned. We can add properties to the module.exports object to export them from the file.

console.log(xyz.people, xyz.ages); //logs the people array from the module.exports object to the console

const os = require('os'); //built-in module in Node.js that provides operating system-related utility methods and properties
// console.log(os);
console.log(os.platform(), os.homedir()); //logs the platform and home directory of the operating system to the console