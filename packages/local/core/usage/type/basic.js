import type from "../../dist/type/type.js";

console.group('• primitive:\n')
  console.log(type([]))
  console.log(type({}))
  console.log(type(''))
  console.log(type(undefined))
  console.log(type(null))
  console.log(type(function() {}))
  console.log(type(Symbol()))
console.groupEnd()