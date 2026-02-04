import * as config from './config.js'
import fsx from 'fs-extra'
import task from 'tasuku'
import download from 'download'
import extract from 'fast-extract'
import { exec } from 'node:child_process'

const target = config.dir.studio
const archive = config.dir.archive
const legacy = config.dir.legacy

async function createStudio() {
  let target_exists = fsx.pathExistsSync(target)
  if(!target_exists) {
    await task('create studio directory', async ({setStatus})=> {
      fsx.mkdirsSync(target)
      setStatus(target)
    })
  }
}
async function createArchive() { 
  let archive_exists = fsx.pathExistsSync(archive)
  if(!archive_exists) {
    await task('create archive directory', async ({setStatus})=> {
      fsx.mkdirSync(archive)
      setStatus(archive)
    })
  } 
}
async function downloadNode() {
  let file_dl = config.node.dl
  let file_name = config.node.osx
  let file_ext = config.node.ext
  let file_target = file_dl+'/'+file_name+'.'+file_ext
  let archive_exists = fsx.pathExistsSync(archive)
  let archive_file = archive+'/'+file_name+'.'+file_ext
  let archive_file_exists = fsx.pathExistsSync(archive_file)
  if(!(archive_exists && archive_file_exists)) {
    await task('download node archive', async ({setStatus})=> {
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
async function createLegacy() {
  let legacy_exists = fsx.pathExistsSync(legacy)
  if(!legacy_exists) {
    await task('create legacy directory', async ({setStatus})=> {
      fsx.mkdirSync(legacy)
      setStatus(legacy)
    })
  }
}
async function extractNode() {
  const target_name = config.node.osx
  const target_node = archive+'/'+target_name
  const target_node_src = target_node+'.'+config.node.ext
  await task('extract node archive', async ({setStatus})=> {
    await extract( target_node_src, legacy+'/temp', { force: true })
    await fsx.move(legacy+'/temp/'+target_name, legacy+'/'+target_name, { overwrite: true })
    await fsx.remove(legacy+'/temp')
    setStatus(legacy+'/'+target_name)
  })
}
async function legalizeNode() {
  let binary = legacy+'/'+config.node.osx+'/bin/node'
  let binary_exists = fsx.existsSync(binary)
  let binary_npm = legacy+'/'+config.node.osx+'/bin/npm'
  if(binary_exists) {
    await task('legalize node execution', async ({setStatus})=> {
      await task('chmode node', async ({setStatus})=> {
        exec(`chmod +x ${binary}`)
        setStatus('+x')
      })
      await task('check node version', async ({setError, setStatus})=> {
        exec(`${binary} -v`, (error, stdout)=> {
          if(error) setError(error)
          setStatus(stdout.trim())
        })
      })
      await task('check npm version', async ({setError, setStatus})=> {
        exec(`${binary_npm} -v`, (error, stdout)=> {
          if(error) setError(error)
          setStatus(stdout.trim())
        })
      })
      setStatus('exec')
    })
  }
}
async function nodeDone() {
  await task('installation status', async ({setStatus})=> {
    setStatus('ok')
  })
}
export {
  createStudio,
  createArchive,
  downloadNode,
  createLegacy,
  extractNode,
  legalizeNode,
  nodeDone
}