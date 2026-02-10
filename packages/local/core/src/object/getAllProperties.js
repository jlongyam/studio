function getAllProperties(obj) {
  const props = new Set();
  let current = obj;
  while (current) {
    Object.getOwnPropertyNames(current).forEach(prop => props.add(prop));
    current = Object.getPrototypeOf(current);
  }
  return Array.from(props);
}
