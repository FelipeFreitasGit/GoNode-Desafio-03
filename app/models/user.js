const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

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

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },

  gerenateToken() {
    return jwt.sign({ id: this.id }, authConfig.secret, {
      expiresIn: 86400,
    });
  },

  findIdFriend(id) {
    return friends.every(item => {
      return id === item;
    });
  },
};

mongoose.model('User', UserSchema);
