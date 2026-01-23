import appRootDir from 'app-root-dir'
import fsx from 'fs-extra'

function nwBoilerplate() {
  let pwd = process.env.PWD
  let app_root = appRootDir.get()
  fsx.copySync(app_root+'/src/legacy/boilerplate', pwd+'/nw-sample')
}

export { nwBoilerplate }