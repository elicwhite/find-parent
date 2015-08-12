'use strict';

var karmaConfig = require('./karma-core-config');

module.exports = function(config) {
  config.set(karmaConfig);

  config.set({
    browsers: ['Chrome'],
    reporters: ['dots']
  });
};
