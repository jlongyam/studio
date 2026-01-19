#!/usr/bin/env node

import process from 'node:process'
import fs from 'fs-extra'
import sycn from '../lib/sync.js'
import config from '../package.json' with { type: 'json'}
import execute from '../lib/executor.js'

const cmd = process.argv.slice(2)
const hasInput = cmd.length > 0
const location = process.env.PWD

console.clear()
console.log('-'.repeat(10))
console.log(cmd)
console.log(location)
console.log('-'.repeat(10))

if(!hasInput) {
  const hasPackage = fs.pathExistsSync(location+'/package.json')
  console.log('package.json:', hasPackage)
  if(hasPackage) {
    console.log('Sync ...')
    console.log(config.location.target)
    const toTarget = config.location.target.replace('$HOME',process.env.HOME)
    console.log(toTarget)
    try {
      sycn(location,toTarget)
      console.log('Synce done.')
      try {
        const binTarget = toTarget.replace('Resources/app.nw','MacOS/nwjs')
        console.log(binTarget)
        execute( binTarget, (output)=> {
          console.log(output);
        })
      } catch(e) {
        console.error(e)
      }
    } catch(e) {
      console.error(e)
    }
  }
}
// else
// --watch


