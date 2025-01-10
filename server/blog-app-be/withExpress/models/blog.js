const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema is a class that constructs a schema for a MongoDB collection

// blogSchema is an instance of the Schema class
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },

}, { timestamps: true }); // timestamps: true is an option that adds a createdAt and updatedAt field to the schema

// model is a function that creates a model for a MongoDB collection
// The first argument is the name of the collection
// The second argument is the schema for the collection


const Blog = mongoose.model('Blog', blogSchema); // Blog is a model for a MongoDB collection

module.exports = Blog; // module.exports is an object that is used to export a variable, function, or class from a module