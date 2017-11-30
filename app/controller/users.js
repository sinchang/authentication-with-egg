'use strict';

const Controller = require('egg').Controller;
const Joi = require('joi');
const randomstring = require('randomstring');
const { hashPassword } = require('../util')

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

class UserController extends Controller {
  async renderRegister() {
    await this.ctx.render('register.art');
  }

  async register() {
    const { ctx } = this;

    try {
      const result = Joi.validate(ctx.request.body, userSchema);
      console.log(result)
      if (result.error) {
        // ctx.app.middlewares.flash('error', 'Data is not valid. Please try again.');
        ctx.redirect('/users/register');
        return;
      }

      // Checking if email is already taken
      const user = await ctx.service.user.findOne({ 'email': result.value.email });
      if (user) {
        // ctx.app.middlewares.flash('error', 'Email is already in use.');
        ctx.redirect('/users/register');
        return;
      }

      // Hash the password
      console.log(hashPassword)
      const hash = await hashPassword(result.value.password);

      // Generate secret token
      const secretToken = randomstring.generate();
      console.log('secretToken', secretToken);

      // Save secret token to the DB
      result.value.secretToken = secretToken;

      // Flag account as inactive
      result.value.active = false;

      // Save user to DB
      delete result.value.confirmationPassword;
      result.value.password = hash;

      const newUser = await ctx.service.user.add(result.value);
      console.log('newUser', newUser);
      ctx.redirect('/users/login');
    } catch(error) {
      throw new Error(error)
    }
  }

  async renderLogin() {
    await this.ctx.render('login.art');
  }

  async renderDashboard() {
    await this.ctx.render('dashboard.art');
  }

  async renderVerify() {
    await this.ctx.render('verify.art');
  }
}

module.exports = UserController;
