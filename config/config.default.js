'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1511678421373_6280';

  // add your config here
  config.middleware = ['flash', 'auth'];

  config.view = {
    defaultViewEngine: 'art',
    mapping: {
      '.art': 'art',
      '.html': 'art'
    }
  };

  config.mongoose = {
    url: process.env.MONGODB_URI,
    options: {}
  };

  config.security = {
    csrf: {
      enable: false,
    }
  };

  return config;
};
