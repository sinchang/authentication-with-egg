'use strict';

const localStrategy = require('passport-local').Strategy;

module.exports = app => {
  const config = app.config.passportLocal;
  config.passReqToCallback = true;
  config.usernameField = 'email';
  config.passwordField = 'password';
  config.session = false;

  app.passport.use('local', new localStrategy(config, (req, email, password, done) => {
    const user = {
      email: email,
      password: password
    };
    console.log(user)
    app.passport.doVerify(req, user, done);
  }));
};
