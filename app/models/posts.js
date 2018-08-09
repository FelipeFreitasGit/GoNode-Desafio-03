const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  like: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
});

mongoose.model('Posts', PostsSchema);
