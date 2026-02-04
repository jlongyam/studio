import env from '../src/env.mjs';

const test = console;
let n_error = 0;
let n_pass = 0;
let msg = {
  pass: i => `√ ${i}: Pass`,
  fail: i => `x ${i}: Failed`
}

test.group('Test:\tenv.cli\n');
  let v = 'node' 
  if (env.cli) {
    test.info(msg.pass(v));
    n_pass++;
  }
  else {
    test.info(msg.fail(v));
    n_error++;
  }
test.groupEnd();

test.info(`\nError:\t${n_error}, Pass: ${n_pass}`);