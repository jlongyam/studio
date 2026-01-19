import envPaths from 'env-paths'

const paths = envPaths('nw-test', {
// const paths = envPaths('nwjs', {
  suffix: '',

});
console.log(paths)