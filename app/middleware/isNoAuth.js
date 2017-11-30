module.exports = options => {
  return async function isNotAuth(ctx, next) {
    if (ctx.isAuthenticated()) {
      ctx.flash('error', 'Sorry, but you are already logged in!');
      ctx.redirect('/');
    } else {
      return next();
    }
  };
};
