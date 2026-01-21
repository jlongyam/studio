import config from './config.js'
import fs from 'fs-extra/esm'

const check = {
  target: {
    location: {
      osx: ()=> {
        const osx = config.target.location.osx;
        if(!fs.pathExistsSync(osx)) {
          fs.mkdirsSync(osx)
        }
      }
    }
  }
};

export default check;
