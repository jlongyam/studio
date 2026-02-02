import icon from "../../src/icon/icon.js";

console.group('All')
  console.log(icon)
console.groupEnd()

console.group('Individual')
  console.log(icon.ok)
  console.log(icon.notOk)
  console.log(icon.arrow.left)
  console.log(icon.arrow.double.left)
  console.log(icon.summary)
console.groupEnd()

console.group('Block')
  console.log(icon.block.repeat(10))
console.groupEnd()