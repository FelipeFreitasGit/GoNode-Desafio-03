const express = require('express');
const requireDir = require('require-dir');
const middleware = require('./middleware/auth');

const routes = express.Router();

const controllers = requireDir('./controllers');

routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

routes.use(middleware);

routes.post('/posts', controllers.postsController.create);
routes.delete('/posts/:id', controllers.postsController.destroy);

module.exports = routes;
