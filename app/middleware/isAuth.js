module.exports = options => {
  return async function isAuth(ctx, next) {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.flash('error', 'Sorry, but you must be registered first!');
      ctx.redirect('/');
    }
  };
};
