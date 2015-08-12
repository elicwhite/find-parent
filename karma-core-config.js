'use strict';

module.exports = {
  frameworks: ['mocha', 'browserify'],

  files: [
    'test/src-tests/**/*.js'
  ],

  preprocessors: {
    'test/src-tests/**/*.js': ['browserify']
  },

  singleRun: true,

  logLevel: 'info',

  browserify: {
    debug: true
  }
};
