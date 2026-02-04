import task from 'tasuku'
import * as config from './config.js'
import { syncContent } from 'sync-content'
import * as current from '../current.js'
import path from 'node:path'

async function currentFolder(option = {}) {
  let opt = option
  opt.source = option.source ? path.normalize(current.location+'/'+option.source) : current.location
  opt.flavour = option.flavour || 'sdk'
  opt.os = 'osx'
  const base = config.dir.legacy+'/'+config.nw[opt.flavour][opt.os]
  const target = base+'/nwjs.app/Contents/Resources/app.nw'
  console.log(opt.source)
  await task('synchronize source to target', async ({setStatus})=> {
    syncContent( opt.source, target).then(()=> {
      setStatus('app.nw')
    }).catch((e)=> console.error(e))
  })
}

export { currentFolder }