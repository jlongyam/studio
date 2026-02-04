function invariant(condition, message) {
  if (!condition) {
    if ("string" == typeof message) throw new Error(message);
    throw message;
  }
}

export { invariant as default };
