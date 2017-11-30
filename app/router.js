'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;

  const local = app.passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/users/login'
  });

  router.get('/', controller.home.index);
  router.get('/users/register', app.middlewares.isNoAuth(), controller.users.renderRegister);
  router.post('/users/register', controller.users.register);
  router.get('/users/login', app.middlewares.isNoAuth(), controller.users.renderLogin);
  router.post('/users/login', local);
  router.get('/users/dashboard', app.middlewares.isAuth(), controller.users.renderDashboard);
  router.get('/users/verify', app.middlewares.isNoAuth(), controller.users.renderVerify);
  router.get('/users/logout', controller.users.handleLogout);

  // const googleAuth = app.passport.authenticate('google', { scope: ['profile'] })
  // app.get('/passport/google', googleAuth);
  // app.get('/passport/google/callback', googleAuth)
  // app.passport.mount('github')
};
