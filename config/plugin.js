'use strict';

const path = require('path');

// had enabled by egg
// exports.static = true;
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  path: path.join(__dirname, '../app/plugin/passport-local'),
};

exports.art = {
  enable: true,
  package: 'egg-view-art',
};

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
