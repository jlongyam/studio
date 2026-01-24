import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const script = fileURLToPath(import.meta.url)
const root = dirname(dirname(script))
const location = process.env.PWD

const node = {
  dl: "https://nodejs.org/en/download/archive/v25.2.1"
}
const nw = {
  manifest: "https://nwjs.io/versions.json",
  dl: "https://dl.nwjs.io",
  version: "v0.107.0",
  date: "2026/01/11",
  files: [
    "win-x64",
    "win-ia32",
    "win-arm64",
    "linux-x64",
    "linux-ia32",
    "osx-x64",
    "osx-arm64"
  ],
  flavors: [
    "normal",
    "sdk"
  ],
  components: {
    "node": "25.2.1",
    "chromium": "144.0.7559.59"
  }
}

export {
  script,     // this file
  root,       // parent of this file
  location,   // user dir
  node,
  nw
}