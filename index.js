'use strict';

require('classlist-polyfill');

var FindParent = {
  byMatcher: function(element, func) {
    if (!element || element === document) {
      return undefined;
    }

    if (func(element)) {
      return element;
    }

    return this.byMatcher(element.parentNode, func);
  },

  byClassName: function(element, className) {
    return this.byMatcher(element, function(el) {
      return el.classList.contains(className);
    });
  }
};

module.exports = FindParent;
