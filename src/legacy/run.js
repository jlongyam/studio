import * as c from './config.js'
import { execSync } from 'node:child_process'
import task from 'tasuku'

async function nwSDK() {
  const nw_sdk = `${c.dir.legacy}/${c.nw.sdk.osx}` //+ '/nwjs.app/Contents/MacOS/nwjs'
  const nw_app = `${nw_sdk}/nwjs.app`
  // const appPath = process.cwd()
  // const cmd = `"${nw_sdk}" "${appPath}" > /dev/null 2>&1 || true`
  // const cmd_open = `open ${nw_app}`

  await task('Run project in nwjs', async ({ setStatus }) => {
    execSync(`open ${nw_app} -W`)
    // const nwProcess = exec(cmd_open, (error) => {
    //   if (error && error.code !== 0) {
    //     console.error('NW.js error:', error.message)
    //   }
    // })
    // process.on('beforeExit', () => {
    //   if (nwProcess && nwProcess.exitCode === null) {
    //     nwProcess.kill()
    //   }
    // })
    setStatus('sdk')
  })
}

export { nwSDK }