import * as config from './config.js'
import fsx from 'fs-extra'
import * as current from '../current.js'
import task from 'tasuku'
import { $ } from 'execa'

const app_source = `${config.dir.legacy}/${config.nw.sdk.osx}`
const app_nw = `${app_source}/nwjs.app/Contents/Resources/app.nw`
const app_package = fsx.readFileSync(`${app_nw}/package.json`)
const app = JSON.parse(app_package)

async function toDMG(app_name) {
  if(app_name === app.name) {
    const app_target = `${current.location}/build/${app.name}/${app.name}.app`
    const destination = `${current.location}/build`
    const create_dmg = `${current.root}/node_modules/create-dmg/cli.js`
    await task('Create DMG installer', async ({setStatus})=> {
      await $`${create_dmg} ${app_target} ${destination} --overwrite --no-version-in-filename --no-code-sign --dmg-title="${app.product_string}"`
      setStatus(`${app.name}.dmg`)
    })
    await task('Test open DMG', async ({setStatus})=> {
      await $`open ${destination}/${app.name}.dmg`
      setStatus(app.name)
    })
  }
}

export { toDMG }