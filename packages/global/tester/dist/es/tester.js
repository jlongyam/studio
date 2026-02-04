var result = {
  pass: 0,
  fail: 0
};

function testGroup(name, fn) {
  console.group(`Test:\t${name}\n`), fn(), console.groupEnd();
}

function testIt(pass) {
  var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
  pass ? (console.info(`√ ${i} : pass`), result.pass++) : (console.info(function(s) {
    return `x ${s} : fail`;
  }(i)), result.fail++);
}

function testResult() {
  console.info(`\nFailed:\t${result.fail}, Passed: ${result.pass}`);
}

export { testGroup as group, testIt as it, testResult as result };
