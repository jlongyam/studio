import type from '../type.js';

console.dir([
	type(null),
	type(undefined),
	type(false),
	type(0),
	type(''),
	type({}),
	type([])
]);

