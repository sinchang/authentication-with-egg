module.exports = options => {
  return async function isNotAuth(ctx, next) {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/');
    } else {
      return next();
    }
  };
};
