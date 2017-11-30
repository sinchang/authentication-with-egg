module.exports = options => {
  return async function auth(ctx, next) {
    ctx.locals.success_messages = ctx.flash('success')[0];
    ctx.locals.error_messages = ctx.flash('error')[0];
    if (ctx.isAuthenticated()) {
      ctx.locals.isAuthenticated = true;
      return next();
    } else {
      ctx.locals.isAuthenticated = false;
      return next();
    }
  };
};
