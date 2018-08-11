const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {
  async signup(req, res, next) {
    try {
      const { email } = req.body;

      if (await User.findOne({ email })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      res.json({
        message: 'User created success',
        user,
        token: user.gerenateToken(),
      });

    } catch (err) {
      return next(err);
    }
  },

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!await user.compareHash(password)) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        message: `Welcome ${email}`,
        user,
        token: user.gerenateToken(),
      });
    } catch (err) {
      return next(err);
    }
  },
};
