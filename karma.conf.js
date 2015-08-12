'use strict';

module.exports = function(config) {
  config.set({
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
    },

    reporters: ['dots'],

    browsers: ['Chrome', 'Firefox']
  });
};
