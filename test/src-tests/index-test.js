'use strict';

var assert = require('chai').assert;
var jsdom = require('jsdom');
var findParent = require('../../');

function getJSDomFromSource(source) {
  return new Promise(function(resolve, reject) {
    jsdom.env(
      source,
      [],
      function(err, window) {
        if (err) {
          return reject(err);
        } else {
          return resolve(window);
        }
      }
    );
  });
}

describe('find-parent/index', function() {
  var promise;

  beforeEach(function() {
    var source = '\
    <div class="foo">\
      <span id="test">\
        <a href="http://google.com">link text</a>\
      </span>\
    </div>';

    promise = getJSDomFromSource(source);

    return promise;
  });

  describe('#byMatcher', function() {
    it('should return undefined when no parent matches', function() {
      return promise.then(function(window) {
        var element = window.document.getElementsByTagName('a')[0];

        var result = findParent.byMatcher(element, function() {
          return false;
        });

        assert.isUndefined(result);
      });
    });

    it('should return itself when it matches', function() {
      return promise.then(function(window) {
        var element = window.document.getElementsByTagName('a')[0];

        var result = findParent.byMatcher(element, function() {
          return true;
        });

        assert.equal(element, result);
      });
    });

    it('should find direct parent', function() {
      return promise.then(function(window) {
        var element = window.document.getElementsByTagName('a')[0];

        var result = findParent.byMatcher(element, function(node) {
          return node.id === 'test';
        });

        assert.equal('test', result.id);
      });
    });

    it('should find ancestor', function() {
      return promise.then(function(window) {
        var element = window.document.getElementsByTagName('a')[0];

        var result = findParent.byMatcher(element, function(node) {
          return node.className === 'foo';
        });

        assert.equal('foo', result.className);
      });
    });
  });
});
