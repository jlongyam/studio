import * as config from './config.js'
import task from 'tasuku'
import fsx from 'fs-extra'

async function appName(name = 'nwjs') {
  await task('Clean app in ~/Library/Application Support/', async ({setStatus})=> {
    fsx.removeSync(config.dir.home+'/Library/Application Support/'+name)
    setStatus(name)
  })
  await task('Clean app in ~/Library/Caches/', async ({setStatus})=> {
    fsx.removeSync(config.dir.home+'/Library/Caches/'+name)
    setStatus(name)
  })
}

export { appName }