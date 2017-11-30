'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log('rederIndex', this.ctx.locals)
    await this.ctx.render('index.art')
  }
}

module.exports = HomeController;
