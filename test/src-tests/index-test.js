'use strict';

const assert = require('chai').assert;
const findParent = require('../../');

describe('find-parent/index', () => {
  let fixtureDiv;
  let element;
  const optsWithThrowOnMiss = {
    throwOnMiss: true
  };
  const optsWithOutThrowOnMiss = {
    throwOnMiss: false
  };

  function assertHandlesOptions(func) {
    [0, [], ''].forEach(invalidOpts => {
      assert.throws(() => {
        func.call(func, invalidOpts);
      }, 'to be an object');
    });
  }

  before(() => {
    fixtureDiv = document.createElement('div');
    fixtureDiv.className = 'fixture-div';

    document.body.appendChild(fixtureDiv);
  });

  beforeEach(() => {
    const source = '\
    <div class="ancestor">\
      <span id="test" class="parent">\
        <a href="http://google.com" class="itself">link text</a>\
      </span>\
    </div>';

    fixtureDiv.innerHTML = source;
  });

  describe('#byMatcher', () => {
    describe('with an element outside of the document', () => {
      let ancestor;
      let parent;

      beforeEach(() => {
        ancestor = document.createElement('div');
        parent = document.createElement('span');
        element = document.createElement('a');
        parent.appendChild(element);
        ancestor.appendChild(parent);
      });

      it('should throw if opts is defined and not an object', () => {
        assertHandlesOptions(findParent.byMatcher.bind(findParent, element, () => {}));
      });

      it('should return undefined when no parent matches', () => {
        const result = findParent.byMatcher(element, () => false);

        assert.isUndefined(result);
      });

      it('should return undefined when no parent matches and throwOnMiss is false', () => {
        const result = findParent.byMatcher(element, () => false, optsWithOutThrowOnMiss);

        assert.isUndefined(result);
      });

      it('should throw when no parent matches and throwOnMiss is true', () => {
        assert.throws(() => {
          findParent.byMatcher(element, () => false, optsWithThrowOnMiss);
        }, 'Expected to find parent node, but none was found.');
      });

      it('should return itself when it matches', () => {
        const result = findParent.byMatcher(element, () => true);

        assert.equal(result, element);
      });

      it('should find direct parent', () => {
        const result = findParent.byMatcher(element, node => node.tagName === parent.tagName);

        assert.equal(result, parent);
      });

      it('should find ancestor', () => {
        const result = findParent.byMatcher(element, node => node.tagName === ancestor.tagName);

        assert.equal(result, ancestor);
      });
    });

    describe('with an element in the document', () => {
      beforeEach(() => {
        element = document.getElementsByTagName('a')[0];
      });

      it('should never pass matcher the document object', () => {
        const result = findParent.byMatcher(element, () => {
          assert.notEqual(element, document);
          return false;
        });

        assert.isUndefined(result);
      });

      it('should return undefined when no parent matches', () => {
        const result = findParent.byMatcher(element, () => false);

        assert.isUndefined(result);
      });

      it('should return undefined when no parent matches and throwOnMiss is false', () => {
        const result = findParent.byMatcher(element, () => false, optsWithOutThrowOnMiss);

        assert.isUndefined(result);
      });

      it('should throw when no parent matches and throwOnMiss is true', () => {
        assert.throws(() => {
          findParent.byMatcher(element, () => false, optsWithThrowOnMiss);
        }, 'Expected to find parent node, but none was found.');
      });

      it('should return itself when it matches', () => {
        const result = findParent.byMatcher(element, () => true);

        assert.equal(result, element);
      });

      it('should find direct parent', () => {
        const result = findParent.byMatcher(element, node => node.id === 'test');

        assert.equal(result.id, 'test');
      });

      it('should find ancestor', () => {
        const result = findParent.byMatcher(element, node => node.className === 'ancestor');

        assert.equal(result.className, 'ancestor');
      });
    });
  });

  describe('#byClassName', () => {
    beforeEach(() => {
      element = document.getElementsByTagName('a')[0];
    });

    it('should throw if opts is defined and not an object', () => {
      assertHandlesOptions(findParent.byClassName.bind(findParent, element, 'nonExistant'));
    });

    it('should return undefined if there are no ancestors with className', () => {
      const result = findParent.byClassName(element, 'nonexistant');

      assert.isUndefined(result);
    });

    it('should return undefined if there are no ancestors with className and throwOnMiss is false', () => {
      const result = findParent.byClassName(element, 'nonexistant', optsWithOutThrowOnMiss);

      assert.isUndefined(result);
    });

    it('should throw if there are no ancestors with className and throwOnMiss is true', () => {
      assert.throws(() => {
        findParent.byClassName(element, 'nonexistant', optsWithThrowOnMiss);
      }, 'Expected to find parent node, but none was found.');
    });

    it('should return itself when it has className', () => {
      const result = findParent.byClassName(element, 'itself');

      assert.equal(result.className, 'itself');
    });

    it('should return parent with className', () => {
      const result = findParent.byClassName(element, 'parent');

      assert.equal(result.className, 'parent');
    });

    it('should return ancestor with className', () => {
      const result = findParent.byClassName(element, 'ancestor');

      assert.equal(result.className, 'ancestor');
    });
  });

  describe('#withDataAttribute', () => {
    beforeEach(() => {
      const source = '\
      <div class="ancestor" data-ancestor-node="1">\
        <span id="test" class="parent" data-parent-node="2">\
          <a href="http://google.com" class="itself" data-itself="3">link text</a>\
        </span>\
      </div>';

      fixtureDiv.innerHTML = source;
      element = document.getElementsByTagName('a')[0];
    });

    it('should throw if opts is defined and not an object', () => {
      assertHandlesOptions(findParent.withDataAttribute.bind(findParent, element, 'nonExistant'));
    });

    it('should return undefined if there are no ancestors with className', () => {
      const result = findParent.withDataAttribute(element, 'nonExistant');

      assert.isUndefined(result);
    });

    it('should return undefined if there are no ancestors with className and throwOnMiss is false', () => {
      const result = findParent.withDataAttribute(element, 'nonExistant', optsWithOutThrowOnMiss);

      assert.isUndefined(result);
    });

    it('should throw if there are no ancestors with className and throwOnMiss is true', () => {
      assert.throws(() => {
        findParent.withDataAttribute(element, 'nonExistant', optsWithThrowOnMiss);
      }, 'Expected to find parent node, but none was found.');
    });

    it('should return itself when it has the data attribute', () => {
      const result = findParent.withDataAttribute(element, 'itself');

      assert.equal(result.className, 'itself');
    });

    it('should return parent with data attribute', () => {
      const result = findParent.withDataAttribute(element, 'parentNode');

      assert.equal(result.className, 'parent');
    });

    it('should return ancestor with data attribute', () => {
      const result = findParent.withDataAttribute(element, 'ancestorNode');

      assert.equal(result.className, 'ancestor');
    });
  });
});
