var result = {
  pass: 0,
  fail: 0
};

exports.group = function(name, fn) {
  console.log(`\nTest:\t${name}\n`), fn();
}, exports.it = function(pass) {
  var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
  pass ? (console.info(`√ ${i} : pass`), result.pass++) : (console.info(function(s) {
    return `x ${s} : fail`;
  }(i)), result.fail++);
}, exports.result = function() {
  console.info(`\nFailed:\t${result.fail}, Passed: ${result.pass}`);
};
