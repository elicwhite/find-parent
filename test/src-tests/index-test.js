'use strict';

var assert = require('chai').assert;
var findParent = require('../../');

describe('find-parent/index', function() {
  var fixtureDiv;
  var element;

  function assertHandlesOptions(func) {
    [0, [], ''].forEach(function(invalidOpts) {
      assert.throws(function() {
        func.call(func, invalidOpts);
      }, 'to be an object');
    });
  }

  before(function() {
    fixtureDiv = document.createElement('div');
    fixtureDiv.className = 'fixture-div';

    document.body.appendChild(fixtureDiv);
  });

  beforeEach(function() {
    var source = '\
    <div class="ancestor">\
      <span id="test" class="parent">\
        <a href="http://google.com" class="itself">link text</a>\
      </span>\
    </div>';

    fixtureDiv.innerHTML = source;
  });

  describe('#byMatcher', function() {
    describe('with an element outside of the document', function() {
      var ancestor;
      var parent;

      beforeEach(function() {
        ancestor = document.createElement('div');
        parent = document.createElement('span');
        element = document.createElement('a');
        parent.appendChild(element);
        ancestor.appendChild(parent);
      });

      it('should throw if opts is defined and not an object', function() {
        assertHandlesOptions(findParent.byMatcher.bind(findParent, element, function() {}));
      });

      it('should return undefined when no parent matches', function() {
        var result = findParent.byMatcher(element, function() {
          return false;
        });

        assert.isUndefined(result);
      });

      it('should return itself when it matches', function() {
        var result = findParent.byMatcher(element, function() {
          return true;
        });

        assert.equal(result, element);
      });

      it('should find direct parent', function() {
        var result = findParent.byMatcher(element, function(node) {
          return node.tagName === parent.tagName;
        });

        assert.equal(result, parent);
      });

      it('should find ancestor', function() {
        var result = findParent.byMatcher(element, function(node) {
          return node.tagName === ancestor.tagName;
        });

        assert.equal(result, ancestor);
      });
    });

    describe('with an element in the document', function() {
      beforeEach(function() {
        element = document.getElementsByTagName('a')[0];
      });

      it('should never pass matcher the document object', function() {
        var result = findParent.byMatcher(element, function() {
          assert.notEqual(element, document);
          return false;
        });

        assert.isUndefined(result);
      });

      it('should return undefined when no parent matches', function() {
        var result = findParent.byMatcher(element, function() {
          return false;
        });

        assert.isUndefined(result);
      });

      it('should return itself when it matches', function() {
        var result = findParent.byMatcher(element, function() {
          return true;
        });

        assert.equal(result, element);
      });

      it('should find direct parent', function() {
        var result = findParent.byMatcher(element, function(node) {
          return node.id === 'test';
        });

        assert.equal(result.id, 'test');
      });

      it('should find ancestor', function() {
        var result = findParent.byMatcher(element, function(node) {
          return node.className === 'ancestor';
        });

        assert.equal(result.className, 'ancestor');
      });
    });
  });

  describe('#byClassName', function() {
    beforeEach(function() {
      element = document.getElementsByTagName('a')[0];
    });

    it('should throw if opts is defined and not an object', function() {
      assertHandlesOptions(findParent.byClassName.bind(findParent, element, 'nonExistant'));
    });

    it('should return undefined if there are no ancestors with className', function() {
      var result = findParent.byClassName(element, 'nonexistant');

      assert.isUndefined(result);
    });

    it('should return undefined if there are no ancestors with className and throwOnMiss is false', function() {
      var result = findParent.byClassName(element, 'nonexistant', optsWithOutThrowOnMiss);

      assert.isUndefined(result);
    });

    it('should throw if there are no ancestors with className and throwOnMiss is true', function() {
      assert.throws(function() {
        findParent.byClassName(element, 'nonexistant', optsWithThrowOnMiss);
      }, 'Expected to find parent node, but none was found.');
    });

    it('should return itself when it has className', function() {
      var result = findParent.byClassName(element, 'itself');

      assert.equal(result.className, 'itself');
    });

    it('should return parent with className', function() {
      var result = findParent.byClassName(element, 'parent');

      assert.equal(result.className, 'parent');
    });

    it('should return ancestor with className', function() {
      var result = findParent.byClassName(element, 'ancestor');

      assert.equal(result.className, 'ancestor');
    });
  });

  describe('#withDataAttribute', function() {
    beforeEach(function() {
      var source = '\
      <div class="ancestor" data-ancestor-node="1">\
        <span id="test" class="parent" data-parent-node="2">\
          <a href="http://google.com" class="itself" data-itself="3">link text</a>\
        </span>\
      </div>';

      fixtureDiv.innerHTML = source;
      element = document.getElementsByTagName('a')[0];
    });

    it('should throw if opts is defined and not an object', function() {
      assertHandlesOptions(findParent.withDataAttribute.bind(findParent, element, 'nonExistant'));
    });

    it('should return undefined if there are no ancestors with className', function() {
      var result = findParent.withDataAttribute(element, 'nonExistant');

      assert.isUndefined(result);
    });

    it('should return undefined if there are no ancestors with className and throwOnMiss is false', function() {
      var result = findParent.withDataAttribute(element, 'nonExistant', optsWithOutThrowOnMiss);

      assert.isUndefined(result);
    });

    it('should throw if there are no ancestors with className and throwOnMiss is true', function() {
      assert.throws(function() {
        findParent.withDataAttribute(element, 'nonExistant', optsWithThrowOnMiss);
      }, 'Expected to find parent node, but none was found.');
    });

    it('should return itself when it has the data attribute', function() {
      var result = findParent.withDataAttribute(element, 'itself');

      assert.equal(result.className, 'itself');
    });

    it('should return parent with data attribute', function() {
      var result = findParent.withDataAttribute(element, 'parentNode');

      assert.equal(result.className, 'parent');
    });

    it('should return ancestor with data attribute', function() {
      var result = findParent.withDataAttribute(element, 'ancestorNode');

      assert.equal(result.className, 'ancestor');
    });
  });
});
