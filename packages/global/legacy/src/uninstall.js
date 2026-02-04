import * as config from './config.js'
import fsx from 'fs-extra'
import task from 'tasuku'

async function cleanDirectory(name) {
  const target = config.dir[name]
  const target_exists = ()=> fsx.pathExistsSync(target)
  if(target_exists()) {
    await task(`clean ${name} directory`, async({setStatus})=> {
      await fsx.remove(target)
      setStatus('is '+target+' exists: '+target_exists())
    })
  }
}

export {
  cleanDirectory
}