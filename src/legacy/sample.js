import fsx from 'fs-extra'
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function nwBoilerplate() {
  let pwd = process.env.PWD
  fsx.copySync(__dirname+'/boilerplate', pwd+'/nw-sample')
}

export { nwBoilerplate }