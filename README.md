# find-parent
[![Build Status](https://travis-ci.org/TheSavior/find-parent.svg?branch=master)](https://travis-ci.org/TheSavior/find-parent)
[![devDependency Status](https://david-dm.org/TheSavior/find-parent/dev-status.svg)](https://david-dm.org/TheSavior/find-parent#info=devDependencies)

Find-parent is a utility to help find the closest element up an element's parent tree (possibly including itself) that matches certain rules.

## Installation

```sh
$ npm install find-parent --save-dev
```

## Usage

The examples below will use this as an example DOM structure.
```
<div class="foo">
  <span id="test">
    <a href="http://google.com">link text</a>
  </span>
</div>
```

### byMatcher(element, func)

```
var findParent = require('find-parent');

var element = document.getElementsByTagName('a')[0];

var result = findParent.byMatcher(element, function(node) {
  return node.className === 'foo';
});

// result is === to the element <div class="foo">
```

### byClassName(element, className)

```
var findParent = require('find-parent');

var element = document.getElementsByTagName('a')[0];

var result = findParent.byClassName(element, 'foo');

// result is === to the element <div class="foo">
```