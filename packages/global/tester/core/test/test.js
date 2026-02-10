import test from '../test.js'
import type from '../type.js'

let result = [];

result.push(test({
	call: function() {
		return 0
	},
	should: 0
}))

result.push(test({
	name: 'should false',
	call: function() {
		return false
	},
	should: false
}))

result.push(test({
  context: 'type(T)',
  name: 'type(0)',
  call: function() {
    return type(0);
  },
  should: 'Number'
}))

console.table(result)