//import * as jsEnv from 'browser-or-node'
import { isBrowser, isNode/*, isWebWorker, isJsDom, isDeno, isBun*/ } from "./jsEnv.js";
// - isWorker
// - isJsDom
// - isWebWorker
// - isDeno
// - isBun
export default {
  browser: isBrowser,
  node: isNode,
  nw: (typeof nw === 'object')
}