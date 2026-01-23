import task from 'tasuku'
import * as config from './config.js'
import { syncContent } from 'sync-content'

async function currentFolder(option = {}) {
  let opt = option
  opt.flavour = option.flavour || 'sdk'
  opt.os = 'osx'
  const src = process.env.PWD
  const base = config.dir.legacy+'/'+config.nw[opt.flavour][opt.os]
  const target = base+'/nwjs.app/Contents/Resources/app.nw'
  await task('synchronize source to target', async ({setStatus})=> {
    syncContent( src, target).then(()=> {
      setStatus('app.nw')
    }).catch((e)=> console.error(e))
  })
}

export { currentFolder }