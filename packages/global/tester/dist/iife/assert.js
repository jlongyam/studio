var assert = function(condition, message) {
  if (!condition) {
    if ("string" == typeof message) throw new Error(message);
    throw message;
  }
};
