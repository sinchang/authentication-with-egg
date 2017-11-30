'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    email: String,
    secretToken: String,
    active: Boolean,
    username: String,
    password: String
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

  return mongoose.model('User', UserSchema);
}
