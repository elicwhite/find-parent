'use strict';

var assert = require('chai').assert;
var findParent = require('../../');

describe('find-parent/index', function() {
  var fixtureDiv;

  before(function() {
    fixtureDiv = document.createElement('div');
    fixtureDiv.className = 'fixture-div';

    document.body.appendChild(fixtureDiv);
  });

  beforeEach(function() {
    var source = '\
    <div class="foo">\
      <span id="test">\
        <a href="http://google.com">link text</a>\
      </span>\
    </div>';

    fixtureDiv.innerHTML = source;
  });

  describe('#byMatcher', function() {
    it('should return undefined when no parent matches', function() {
      var element = document.getElementsByTagName('a')[0];

      var result = findParent.byMatcher(element, function() {
        return false;
      });

      assert.isUndefined(result);
    });

    it('should return itself when it matches', function() {
      var element = document.getElementsByTagName('a')[0];

      var result = findParent.byMatcher(element, function() {
        return true;
      });

      assert.equal(element, result);
    });

    it('should find direct parent', function() {
      var element = document.getElementsByTagName('a')[0];

      var result = findParent.byMatcher(element, function(node) {
        return node.id === 'test';
      });

      assert.equal('test', result.id);
    });

    it('should find ancestor', function() {
      var element = document.getElementsByTagName('a')[0];

      var result = findParent.byMatcher(element, function(node) {
        return node.className === 'foo';
      });

      assert.equal('foo', result.className);
    });
  });
});
