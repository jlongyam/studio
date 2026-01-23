import * as config from './config.js'
import fsx from 'fs-extra'
import task from 'tasuku'
import download from 'download'
import extract from 'fast-extract'
import { exec } from 'node:child_process'

const archive = config.dir.archive
const legacy = config.dir.legacy

async function downloadNW(option = {}) {
  let file_dl = config.nw.dl
  let opt = option
  opt.flavour = option.flavour || 'sdk'
  opt.os = 'osx'
  let file_name = (opt.flavour !== 'sdk') ? config.nw[opt.os] : config.nw.sdk[opt.os]
  let file_ext = config.nw.ext
  let file_target = file_dl+'/'+file_name+'.'+file_ext
  let archive_exists = fsx.pathExistsSync(archive)
  let archive_file = archive+'/'+file_name+'.'+file_ext
  let archive_file_exists = fsx.pathExistsSync(archive_file)
  if(!(archive_exists && archive_file_exists)) {
    await task('download nw archive', async ({setStatus})=> {
      await download(
        file_target,
        archive,
        {},
        false,
        file_name
      )
      setStatus(file_target)
    })
  }
}
async function extractNW(option = {}) {
  let opt = option
  opt.flavour = option.flavour || 'sdk'
  opt.os = 'osx'
  const target_name = (opt.flavour !== 'sdk') ? config.nw[opt.os] : config.nw.sdk[opt.os]
  const target_file = archive+'/'+ target_name
  const target_file_src = target_file+'.'+config.nw.ext
  await task(`extract nw archive`, async ({setStatus})=> {
    await extract( target_file_src, legacy+'/temp', { force: true })
    await fsx.move(legacy+'/temp/'+target_name, legacy+'/'+target_name, { overwrite: true })
    await fsx.remove(legacy+'/temp')
    setStatus(legacy+'/'+target_name)
  })
}
async function legalizeNW(option = {}) {
  let opt = option
  opt.flavour = option.flavour || 'sdk'
  opt.os = 'osx'
  const target_name = (opt.flavour !== 'sdk') ? config.nw[opt.os] : config.nw.sdk[opt.os]
  let binary = legacy+'/'+target_name+'/nwjs.app/Contents/MacOS/nwjs'
  await task('legalize nwjs execution', async ({setStatus})=> {
    await task('chmode nwjs', async ({setStatus})=> {
      exec(`chmod +x ${binary}`)
      setStatus('+x')
    })
    await task('remove quarantine nwjs', async ({setStatus})=> {
      exec(`xattr -dr com.apple.quarantine ${binary}`)
      setStatus('xattr -dr com.apple.quarantine')
    })
    setStatus('exec')
  })
}
async function nwDone() {
  await task('installation status', async ({setStatus})=> {
    setStatus('ok')
  })
}
export {
  downloadNW,
  extractNW,
  legalizeNW,
  nwDone
}