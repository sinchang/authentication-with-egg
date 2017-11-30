'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async add(user) {
    const ret = await new this.ctx.model.User(user).save();
    return ret;
  }

  async findOne(obj) {
    const ret = await this.ctx.model.User.findOne(obj);
    return ret;
  }
}

module.exports = UserService;
