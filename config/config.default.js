'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511678421373_6280';

  // add your config here
  config.middleware = [];

  config.passportGoogle = {
    key: '328043910272-ferlpj5jph5kqlvj07paorp7im55l712.apps.googleusercontent.com',
    secret: 'bHrXXS4wm60clgCacwJpoO8g'
  };

  config.passportGithub = {
    key: '6bd46946ef7f21e2a540',
    secret: 'e19b3a65aec92b0358e2531342589b3a62bb11f0'
  };

  config.view = {
    defaultViewEngine: 'art',
    mapping: {
      '.art': 'art',
      '.html': 'art'
    }
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/auth',
    options: {}
  };

  config.security = {
    csrf: {
      enable: false,
    }
  };

  return config;
};
