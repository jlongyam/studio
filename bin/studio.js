#!/usr/bin/env node

import { exec } from 'node:child_process'
import task from 'tasuku'
import * as config from '../src/legacy/config.js'
import fsx from 'fs-extra'

const help = `
Usage: studio [command]

Commands:
  install             Install legacy node and nw
  sample              Create nw-sample folder in current folder
  sync                Synchronize current folder to app.nw
  run                 Run current folder using nw-sdk
  build               Build current folder using nw
  node <command>      Redirect command to node
  npm <command>       Redirect command to npm
  uninstall           Uninstall studio/legacy 
  clean [name]        Delete all nw app with specific name 
`
const args = process.argv.slice(2)

if(args[0] === 'help') console.log(help)
else if(args[0] === 'install') {
  await task('Installing Node', async ({setStatus})=> {
    const install = await import('../src/legacy/install.js')
    await install.createStudio()
    await install.createArchive()
    await install.downloadNode()
    await install.createLegacy()
    await install.extractNode()
    await install.legalizeNode()
    await install.nodeDone()
    setStatus('v5.12.0')
  })
  await task('Installing NW', async ({setStatus})=> {
    const install_nw = await import('../src/legacy/install-nw.js')
    await install_nw.downloadNW()
    await install_nw.extractNW()
    await install_nw.legalizeNW()
    await install_nw.nwDone() 
    setStatus('v0.14.7-SDK')
  })
}
else if(args[0] === 'sample') {
  task('Create NW Sample', async ({setStatus})=> {
    const sample = await import('../src/legacy/sample.js')
    sample.nwBoilerplate()
    setStatus('nw-sample')
  })
}
else if(args[0] === 'sync') {
  const sync = await import('../src/legacy/sync.js')
  await sync.currentFolder()
}
else if(args[0] === 'run') {
  const nw_sdk = config.dir.legacy+'/'+config.nw.sdk.osx+'/nwjs.app/Contents/MacOS/nwjs'
  try {
    // window: trap "taskkill /F /IM nw.exe /T" EXIT
    exec(`trap "pkill -f nwjs" EXIT; ${nw_sdk}`, (error, stdoud)=> {
      if(error) { process.exit = 1 }
      console.log(stdoud.trim())
    })
  } catch(e) {}
}
else if(args[0] === 'node') {
  const arg = process.argv.slice(3).join(' ')
  const node = config.dir.legacy+'/'+config.node.osx+'/bin/node'
  exec(`${node} ${arg}`, (error, stdout)=> {
    if(error) console.error(error.trim())
    console.log(stdout.trim())
  })
}
else if(args[0] === 'npm') {
  const arg = process.argv.slice(3).join(' ')
  const npm = config.dir.legacy+'/'+config.node.osx+'/bin/npm'
  exec(`${npm} ${arg}`, (error, stdout)=> {
    if(error) console.error(error.trim())
    console.log(stdout.trim())
  })
}
else if(args[0] === 'uninstall') {
  await task('Uninstalling legacy SDK', async ({setStatus})=> {
    const uninstall = await import('../src/legacy/uninstall.js')
    await uninstall.cleanDirectory('legacy')
    setStatus('legacy')
  })
}
else if(args[0] === 'clean') {
  const name = args[1].trim()
  const clean = await import('../src/legacy/clean.js')
  await clean.appName(name)
}
else console.log(help)