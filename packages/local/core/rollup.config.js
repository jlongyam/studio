import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import buble from '@rollup/plugin-buble';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
// import config from './package.json' with { type: 'json' }

const year = new Date().getFullYear();
// const banner = `
//   /*!
//   * ${config.name} - local lib
//   * Version ${config.version}
//   * https://github.com/${config.author}/env
//   * MIT License - ${year}
//   */
//

const banner_type = `
  /*!
  * type - JS type detector
  * MIT License - ${year}
  */ 
  `
const strict = false;
const plugins = [
  resolve(),
  commonjs(),
  nodePolyfills(),
  buble()/*,
  babel({
    babelHelpers: 'bundled',
    // presets: ['@babel/preset-env']
    presets: []
  })*/
];
const terser_beauty = [
  terser({
    compress: {
      dead_code: true,
      unused: true,
      passes: 2,
      drop_console: true,
      ecma: 2015
    },
    mangle: false,
    format: {
      comments: false,
      beautify: true,
      indent_level: 2
    }
  })
];
const terser_minify = [
  terser({
    compress: {
      dead_code: true,
      unused: true,
      passes: 2,
      drop_console: true,
      ecma: 2015
    },
    mangle: true,
    format: {
      comments: false
    }
  })
]
export default [{
  // type
  input: './src/type/type.js',
  output: [/*{
    // umd
    format: 'umd',
    file: './dist/type/type.umd.js',
    name: 'env',
    strict: strict,
    banner: banner_type,
    plugins: terser_beauty
  }, */{
    // es
    format: 'es',
    file: './dist/type/type.js',
    strict: strict,
    banner: banner_type,
    plugins: terser_beauty
  }, {
    // es - min
    format: 'es',
    file: './dist/type/type.min.js',
    strict: strict,
    banner: banner_type,
    plugins: terser_minify
  }],
  plugins: plugins
}]