import * as test from '../src/base.mjs';

test.group('Add', function() {
  test.it(1 + 1 === 2, 'it should 2');
  test.it(1 + 1 === 3, 'it should fail');
});

test.result()