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
  router.get('/users/register', controller.users.renderRegister);
  router.post('/users/register', controller.users.register);
  router.get('/users/login', controller.users.renderLogin);
  router.post('/users/login', local);
  router.get('/users/dashboard', controller.users.renderDashboard);
  router.get('/users/verify', controller.users.renderVerify);

  // const googleAuth = app.passport.authenticate('google', { scope: ['profile'] })
  // app.get('/passport/google', googleAuth);
  // app.get('/passport/google/callback', googleAuth)
  // app.passport.mount('github')
};
