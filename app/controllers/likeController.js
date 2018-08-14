const mongoose = require('mongoose');

const Post = mongoose.model('Posts');

module.exports = {
  async curtir(req, res, next) {
    try {
      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(400).json({ error: 'Post doesn exist' });
      }

      const liked = post.like.indexOf(req.userId);

      if (liked === -1) {
        post.like.push(req.userId);
      } else {
        post.like.splice(liked, 1);
      }

      await post.save();

      return res.json(post);
    } catch (err) {
      return next(err);
    }
  }
};
