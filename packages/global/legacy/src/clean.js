import * as config from './config.js'
import task from 'tasuku'
import fsx from 'fs-extra'

const home = config.dir.home
async function appName(name = 'nwjs') {
  await task('Clean app in ~/Library/Application Support/', async ({setStatus})=> {
    fsx.removeSync(`${home}/Library/Application Support/${name}`)
    setStatus(name)
  })
  await task('Clean app in ~/Library/Caches/', async ({setStatus})=> {
    fsx.removeSync(`${home}/Library/Caches/${name}`)
    setStatus(name)
  })
  await task('clean build', async ({setStatus})=> {
    fsx.removeSync(`${process.env.PWD}/build/${name}`)
    setStatus('build')
  })
}
async function appPreference( id ) {
  await task('Clean ~/Library/Preferences/target.plist', async ({setStatus})=> {
    fsx.removeSync(`${home}/Library/Preferences/io.nwjs.nw.plist`)
    fsx.removeSync(`${home}/Library/Preferences/io.nwjs.nwjs.plist`)
    if(id) {
      fsx.removeSync(`${home}/Library/Preferences/${id}.plist`)
    }
    setStatus('product_id.plist')
  })
}
export { appName, appPreference }