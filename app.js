'use strict';

module.exports = app => {
  app.passport.verify(function* (ctx, user) {
    console.log(user)
    // 假设login请求是由form发送，带有参数username, password
    // var ret = yield ctx.service.user.findOne({
    //   email: user.email,
    //   password: user.password
    // });
    // return ret;
  });
};
