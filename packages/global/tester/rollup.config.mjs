import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import cfg from './package.json' with { type: 'json' }

const year = new Date().getFullYear();
const banner = `
  /*!
  * ${cfg.name} - JS Tester tool
  * Version ${cfg.version}
  * Author: ${cfg.author}
  * ${cfg.homepage}/${cfg.repository.directory}
  * MIT License - ${year}
  */ 
  `
const strict = false;
const plugins = [
  resolve(),
  commonjs(),
  nodePolyfills(),
  babel({
    babelHelpers: 'bundled',
    presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, last 2 versions, Firefox ESR, not dead, node 5.12.0, chrome 50",
      },
    ],
  ]
  })
];

const terser_beauty = [
  terser({
    compress: {
      dead_code: true,
      unused: true,
      passes: 2,
      drop_console: false,
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
      drop_console: false,
      ecma: 2015
    },
    mangle: true,
    format: {
      comments: false
    }
  })
]

export default (arg)=> {
  let minify = arg['config-min'] ? true : false;
  const path_in = '.';
  const path_out = `${path_in}/dist`;
  const forms = ['es', 'cjs', 'iife'];
  const ns = {
    base: "test",
    assert: "assert"
  };
  const filename = {
    base: "tester",
    assert: "assert"
  };
  let output = {
    base: [],
    assert: []
  };
  for(let i = 0; i < forms.length; i++) {
    output.base.push({
      format: forms[i],
      name: ns.base,
      banner: banner,
      strict: strict,
      file: minify ? `${path_out}/${forms[i]}/${filename.base}.min.js` : `${path_out}/${forms[i]}/${filename.base}.js`,
      plugins: minify ? terser_minify : terser_beauty
    })
  }
  for(let i = 0; i < forms.length; i++) {
    output.assert.push({
      format: forms[i],
      name: ns.assert,
      banner: banner,
      strict: strict,
      file: minify ? `${path_out}/${forms[i]}/${filename.assert}.min.js` : `${path_out}/${forms[i]}/${filename.assert}.js`,
      plugins: minify ? terser_minify : terser_beauty
    })
  }
  return [{
    input: `${path_in}/src/base.mjs`,
    output: output.base,
    plugins: plugins
  }, {
    input: `${path_in}/src/assert.mjs`,
    output: output.assert,
    plugins: plugins
  }];
}