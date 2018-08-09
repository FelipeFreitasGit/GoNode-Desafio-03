const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  sexo: {
    type: String,
    maxlength: 1,
  },
  friends: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
});

mongoose.model('User', UserSchema);
