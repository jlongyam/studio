var test = require('../dist/cjs/tester.js');
var assert = require("../dist/cjs/assert.js");


test.group('Add', function() {
  var result = false;
  try {
    assert(1 + 1 === 3);
    result = true;
  } catch(e) {
    result = false;
  }
  test.it(result, 'it should fail');
  try {
    assert(1 + 1 === 2);
    result = true;
  } catch(e) {
    result = false;
  }
  test.it(result, 'it should pass');
});

test.result()