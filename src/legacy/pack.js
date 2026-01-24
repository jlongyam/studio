import * as config from './config.js'
import fsx from 'fs-extra'
import * as current from '../current.js'
import task from 'tasuku'
import { $ } from 'execa'

const app_source = `${config.dir.legacy}/${config.nw.sdk.osx}`
const app_nw = `${app_source}/nwjs.app/Contents/Resources/app.nw`
const app_package = fsx.readFileSync(`${app_nw}/package.json`)
const app = JSON.parse(app_package)

async function toDMG() {
  const app_target = `${current.location}/build/${app.name}/${app.name}.app`
  const destination = `${current.location}/build`
  await task('Create DMG installer', async ({setStatus})=> {
    await $`npx create-dmg ${app_target} ${destination} --overwrite --no-version-in-filename --no-code-sign --dmg-title="${app.product_string}"`
    setStatus(`${app.name}.app`)
  })
  await task('Test open DMG', async ({setStatus})=> {
    await $`open ${destination}/${app.name}.dmg`
    setStatus(`${app.name}.dmg`)
  })
}

export { toDMG }