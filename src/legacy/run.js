import * as c from './config.js'
import { execSync } from 'node:child_process'
import task from 'tasuku'

async function nwSDK() {
  const nw_sdk = `${c.dir.legacy}/${c.nw.sdk.osx}`
  const nw_app = `${nw_sdk}/nwjs.app`
  await task('Run project in nwjs', async ({ setStatus }) => {
    execSync(`open ${nw_app} -W`)
    setStatus('sdk')
  })
}

export { nwSDK }