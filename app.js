'use strict';

const { comparePasswords } = require('./app/util')

module.exports = app => {
  app.passport.verify(async (ctx, user) => {
    const {
      email,
      password
    } = user;

    try {
      // 1) Check if the email already exists
      const user = await ctx.service.user.findOne({
        'email': email
      });

      if (!user) {
        ctx.flash('error', 'Unknown User');
        return null;
      }

      // 2) Check if the password is correct
      const isValid = comparePasswords(password, user.password);
      if (!isValid) {
        ctx.flash('error', 'Unknown Password');
        return null;
      }

      // 3) Check if email has been verified
      // if (!user.active) {
      //   throw new Error('status = 401')
      // }
      return user;
    } catch (error) {
      return null;
    }
  });
};
