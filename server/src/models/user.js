const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const dbURI =
  'mongodb+srv://achraf:ACIen1.2021k@igblog.m5vpz.mongodb.net/igblog?retryWrites=true&w=majority&appName=igblog';

const userSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true, min: 8 },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: '', maxlength: 100, required: false },
  preferences: { type: [String], default: [], required: false },
  img: { type: String, default: '', required: false },
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
});

const UserModel = model('User', userSchema);

module.exports = UserModel;
