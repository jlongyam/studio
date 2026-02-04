import assert from '../src/assert.mjs';

try {
  assert(false, 'This condition is false');
} catch(e) {
  console.log('pass')
}
try {
  assert(true, 'This message will not appear');
} catch(e) {
  console.error(e)
}