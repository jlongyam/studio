import * as config from './config.js'
import { exec } from 'node:child_process'
import task from 'tasuku'

async function nwSDK() {
  const nw_sdk = config.dir.legacy + '/' + config.nw.sdk.osx + '/nwjs.app/Contents/MacOS/nwjs'
  const appPath = process.cwd()
  const cmd = `"${nw_sdk}" "${appPath}" > /dev/null 2>&1 || true`

  await task('Run project in nwjs', async ({ setStatus }) => {
    const nwProcess = exec(cmd, (error) => {
      if (error && error.code !== 0) {
        console.error('NW.js error:', error.message)
      }
    })
    process.on('beforeExit', () => {
      if (nwProcess && nwProcess.exitCode === null) {
        nwProcess.kill()
      }
    })
    setStatus('sdk')
  })
}

export { nwSDK }