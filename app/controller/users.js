'use strict';

const Controller = require('egg').Controller;
const Joi = require('joi');
const randomstring = require('randomstring');
const { hashPassword, sendEmail } = require('../util')

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

      if (result.error) {
        ctx.flash('error', 'Data is not valid. Please try again.');
        ctx.redirect('/users/register');
        return;
      }

      // Checking if email is already taken
      const user = await ctx.service.user.findOne({ 'email': result.value.email });
      if (user) {
        ctx.flash('error', 'Email is already in use.');
        ctx.redirect('/users/register');
        return;
      }

      // Hash the password
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

      // Compose email
      // const html = `Hi there,
      // <br/>
      // Thank you for registering!
      // <br/><br/>
      // Please verify your email by typing the following token:
      // <br/>
      // Token: <b>${secretToken}</b>
      // <br/>
      // On the following page:
      // <a href="http://localhost:7001/users/verify">http://localhost:7001/users/verify</a>
      // <br/><br/>
      // Have a pleasant day.`

      // Send email
      // await sendEmail('hi@sinchang.me', result.value.email, 'Please verify your email!', html);

      ctx.redirect('/users/login');
    } catch(error) {
      throw new Error(error)
    }
  }

  async renderLogin() {
    await this.ctx.render('login.art');
  }

  async renderDashboard() {
    await this.ctx.render('dashboard.art', {
      username: this.ctx.user.username
    });
  }

  async renderVerify() {
    await this.ctx.render('verify.art');
  }

  async handleLogout() {
    this.ctx.logout();
    this.ctx.redirect('/');
  }
}

module.exports = UserController;
