const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async create(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      const me = await User.findById(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'User does not exist' });
      }

      user.friends.push(req.userId);
      await user.save();

      me.friends.push(user.id);
      await me.save();

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
