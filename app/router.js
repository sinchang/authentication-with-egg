'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  const googleAuth = app.passport.authenticate('google', { scope: ['profile'] })
  app.get('/passport/google', googleAuth);
  app.get('/passport/google/callback', googleAuth)
  // app.passport.mount('google')
  app.passport.mount('github')
};
