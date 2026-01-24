#!/usr/bin/env node

import { exec, execSync } from 'node:child_process'
import task from 'tasuku'
import * as config from '../src/legacy/config.js'
import * as current from '../src/current.js'

const help = `
Usage: studio [command]

Commands:
  install             Install legacy node and nw
  template            Create nw-sample template folder in current location
  sync [folder]       Synchronize current or specific folder app.nw
  run                 Run current folder using nw-sdk
  node <command>      Redirect command to node
  npm <command>       Redirect command to npm
  build               Build current folder using nw
  open <name>         Open current build app name
  clean [name] [id]   Delete all nw app with specific name and or ID
  pack <target>       Create DMG installer for target.app
  uninstall           Uninstall studio/legacy 
`
const args = process.argv.slice(2)

if (args[0] === 'help') console.log(help)
else if (args[0] === 'install') {
  await task('Installing Node', async ({ setStatus }) => {
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
  await task('Installing NW', async ({ setStatus }) => {
    const install_nw = await import('../src/legacy/install-nw.js')
    await install_nw.downloadNW({flavour: 'default'})
    await install_nw.extractNW({flavour: 'default'})
    await install_nw.legalizeNW({flavour: 'default'})
    await install_nw.nwDone()
    setStatus('v0.14.7')
    await install_nw.downloadNW()
    await install_nw.extractNW()
    await install_nw.legalizeNW()
    await install_nw.nwDone()
    setStatus('v0.14.7-SDK')
  })
}
else if (args[0] === 'template') {
  task('Create NW Sample', async ({ setStatus }) => {
    const sample = await import('../src/legacy/sample.js')
    sample.nwBoilerplate()
    setStatus('nw-sample')
  })
}
else if (args[0] === 'sync') {
  const sync = await import('../src/legacy/sync.js')
  if(args[1]) {
    await sync.currentFolder({
      source: args[1]
    })
  } else {
    await sync.currentFolder()
  }
}
else if (args[0] === 'run') {
  if (args[0] === 'run') {
    const run = await import('../src/legacy/run.js')
    await run.nwSDK()
  }
}
else if (args[0] === 'node') {
  const arg = process.argv.slice(3).join(' ')
  const node = config.dir.legacy + '/' + config.node.osx + '/bin/node'
  exec(`${node} ${arg}`, (error, stdout) => {
    if (error) console.error(error)
    console.log(stdout.trim())
  })
}
else if (args[0] === 'npm') {
  const arg = process.argv.slice(3).join(' ')
  const npm = config.dir.legacy + '/' + config.node.osx + '/bin/npm'
  exec(`${npm} ${arg}`, (error, stdout) => {
    if (error) console.error(error)
    console.log(stdout.trim())
  })
}
else if (args[0] === 'build') {
  const build = await import('../src/legacy/build.js')
  await build.prepareOutput()
  await build.updateContent()
  await build.legalizeApp()
}
else if(args[0] === 'open') {
  if(args[1]) {
    execSync(`open ${current.location}/build/${args[1]}/${args[1]}.app -W`)
  } else {
    console.log(help)
  }
}
else if (args[0] === 'clean') {
  const clean = await import('../src/legacy/clean.js')
  let name = args[1]
  let id = args[2]
  await clean.appName(name)
  if(id) {
    await clean.appPreference(id)
  }
}
else if (args[0] === 'pack') {
  if(args[1]) {
    const pack = await import('../src/legacy/pack.js')
    await pack.toDMG(args[1])
  } else {
    console.log(help)
  }
}
else if (args[0] === 'uninstall') {
  await task('Uninstalling legacy SDK', async ({ setStatus }) => {
    const uninstall = await import('../src/legacy/uninstall.js')
    await uninstall.cleanDirectory('legacy')
    setStatus('legacy')
  })
}
else console.log(help)