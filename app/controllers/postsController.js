const mongoose = require('mongoose');

const Posts = mongoose.model('Posts');

module.exports = {
  async create(req, res, next) {
    try {
      const post = await Posts.create({ ...req.body, user: req.userId });

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Posts.findByIdAndRemove(req.params.id);

      return res.json({
        message: 'Successfully removed post',
      })
    } catch (err) {
      return next(err);
    }
},
};
