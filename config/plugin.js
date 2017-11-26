'use strict';

// had enabled by egg
// exports.static = true;
exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportGoogle = {
	enabled: true,
	package: 'egg-passport-google'
}

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github'
}
