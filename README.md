# find-parent

Find-parent is a utility to help find the closest parent element that you are looking for.

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

