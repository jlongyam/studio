import fsx from 'fs-extra'
import * as current from '../current.js'

function nwBoilerplate() {
  const from = `${current.root}/boilerplate`
  const to = `${current.location}`
  fsx.copySync(from, `${to}/nw-sample`)
}

export { nwBoilerplate }