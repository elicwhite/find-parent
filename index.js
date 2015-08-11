'use strict';

var FindParent = {
  byMatcher: function(element, func) {
    if (!element) {
      return undefined;
    }

    if (func(element)) {
      return element;
    }

    return this.byMatcher(element.parentNode, func);
  }
};

module.exports = FindParent;
