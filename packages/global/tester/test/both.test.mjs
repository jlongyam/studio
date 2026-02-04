import * as test from '../src/base.mjs';
import assert from '../src/assert.mjs';


test.group('Add', function() {
  let result = false;
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