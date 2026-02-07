// test.js
import { assert, expect } from "./assert.js";

try {
  console.log("Running tests...");
  // Usage
assert(1 === 1, "One should equal one"); // Passes
assert(1 === 2, "One does not equal two"); // Throws Error
  // 1. Simple check
  expect(1 + 2).toBe(2);

  // 2. Object check
  const user = { name: "Alice", age: 25 };
  expect(user).toEqual({ name: "Alice", age: 25 });

  // 3. Negation
  // expect(user).not.toEqual({ name: "Bob" });

  // 4. Error checking
  // expect(() => { throw new Error("Fail!"); }).toThrow("Fail");

  console.log("✅ All tests passed!");
} catch (error) {
  console.error(`❌ Test Failed:\n${error.message}`);
  process.exit(1); // Exit with error code
}