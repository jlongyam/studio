class AssertionError extends Error {
  constructor(message) {
    super(message);
    this.name = "AssertionError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, expect);
    }
  }
}

const assert = (condition, message) => {
  if (!condition) {
    throw new AssertionError(message);
  }
};


function isDeepEqual(a, b) {
  if (a === b) return true;
  if (a === null || typeof a !== "object" || b === null || typeof b !== "object") {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !isDeepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}

// 3. The Library Factory
function expect(actual) {
  // 4. Define Matchers
  const toBe = (expected) => {
    if (actual !== expected) {
      throw new AssertionError(`Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
    }
  };

  const toEqual = (expected) => {
    if (!isDeepEqual(actual, expected)) {
      throw new AssertionError(`Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`);
    }
  };

  const toBeTruthy = () => {
    if (!actual) {
      throw new AssertionError(`Expected ${JSON.stringify(actual)} to be truthy`);
    }
  };


  // 5. Implement Negation
  return {
    toBe,
    toEqual,
    toBeTruthy
  };
}

assert.deepEqual = isDeepEqual
assert.ok = function(value, message) {
    // The !value check covers: false, 0, "", null, undefined, NaN
    if (!value) {
      // If no message is provided, create a helpful default one
      const defaultMessage = `Expected ${value} to be truthy`;
      throw new AssertionError(message || defaultMessage);
    }
  }

export { assert, expect }