const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ReplySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now },
});

const BlogSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    views: { type: Number, default: 0 },
    tags: { type: [String], default: [], required: false },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.models.Blog || model('Blog', BlogSchema);

module.exports = BlogModel;