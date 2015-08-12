'use strict';

var karmaConfig = require('./karma-core-config');

var SAUCE_BROWSERS = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome'
  },

  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  },

  sl_ios_safari: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1'
  },

  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }
};

module.exports = function(config) {
  config.set(karmaConfig);

  config.set({
    sauceLabs: {
      testName: 'find-parent tests',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },

    customLaunchers: SAUCE_BROWSERS,
    browsers: Object.keys(SAUCE_BROWSERS),
    reporters: ['dots', 'saucelabs']
  });
};
