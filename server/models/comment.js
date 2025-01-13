const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Comment Schema
const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
    replies: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);


const CommentModel = model('Comment', CommentSchema);

module.exports = CommentModel;