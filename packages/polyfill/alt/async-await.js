function async(fn) {
  return function () {
    return new Promise((resolve, reject) => {
      let GeneratorFunction = Object.getPrototypeOf(function* () { }).constructor;
      let generatorSource = fn instanceof GeneratorFunction
        ? fn.toString()
        : `${fn.toString()}`.replace(/^function /, 'function* ');
      generatorSource = generatorSource.replace(/[^_a-zA-Z0-9]await[^_a-zA-Z0-9]/g, pattern => {
        return pattern.replace('await', 'yield');
      });
      let generator = eval(`(${generatorSource});`);
      let iterator = generator.apply(undefined, Array.from(arguments));
      let iterate = iteration => {
        if (iteration.done) {
          resolve(iteration.value);
          return;
        }
        const promise = iteration.value;
        return promise
          .then(p => {
            iterate(iterator.next(p))
          })
          .catch(e => {
            try {
              iterator.throw(e);
            } catch (e) {
              reject(e)
            }
          })
      };
      return iterate(iterator.next());
    })
  };
}
