let result = {
  pass: 0,
  fail: 0
}
function testGroup(name, fn) {
  console.group(`Test:\t${name}\n`);
  fn()
  console.groupEnd()
}
function testIt(pass, i = '') {
  let msg = {
    pass: s => `√ ${s} : pass`,
    fail: s => `x ${s} : fail`
  };
  if (pass) {
    console.info(msg.pass(i));
    result.pass++;
  }
  else {
    console.info(msg.fail(i));
    result.fail++;
  }
}
function testResult() {
  console.info(`\nFailed:\t${result.fail}, Passed: ${result.pass}`)
}

export {
  testGroup as group,
  testIt as it,
  testResult as result
}
