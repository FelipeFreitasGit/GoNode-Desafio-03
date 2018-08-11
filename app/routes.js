const express = require('express');
const requireDir = require('require-dir');
const middleware = require('./middleware/auth');

const routes = express.Router();

const controllers = requireDir('./controllers');

routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

routes.use(middleware);

module.exports = routes;
