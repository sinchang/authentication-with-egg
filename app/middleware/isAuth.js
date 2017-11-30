module.exports = options => {
  return async function isAuth(ctx, next) {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.redirect('/');
    }
  };
};
