import fsx from 'fs-extra'
import path from 'node:path'
import task from 'tasuku'
import plist from 'simple-plist'
import { execSync } from 'node:child_process'
import * as config from './config.js'
import { readStringsFile, writeStringsFile } from './util.js'
import * as current from '../current.js'

const cwd = current.location
const app_location = `${config.dir.legacy}/${config.nw.sdk.osx}`

async function prepareOutput(output = 'build') {  
  const dest = `${cwd}/${output}`
  await task('Create folder build', async ({setStatus})=> {
    let output_exists = fsx.pathExistsSync(dest)
    if(output_exists) await fsx.remove(dest)
    await fsx.mkdir(`${cwd}/${output}`)
    setStatus(output)
  })
  await task('Copy nw to output', async ({setStatus})=> {
    const input = `${config.dir.legacy}/${config.nw.osx}`
    let input_exists = fsx.pathExistsSync(input)
    if(input_exists) {
      const app_nw = `${app_location}/nwjs.app/Contents/Resources/app.nw`
      let app_nw_exists = fsx.pathExistsSync(app_nw)
      if(app_nw_exists) {
        const app_package = fsx.readFileSync(`${app_nw}/package.json`)
        let app = JSON.parse(app_package)
        const nw_app = `${config.dir.legacy}/${config.nw.osx}`
        await task('Copy nwjs.app to output', async ({setStatus})=> {
          await fsx.copy(nw_app,`${dest}/${app.name}`)
          setStatus(app.name)
        })
        await task('Copy content from nw-sdk', async ({setStatus})=> {
          await fsx.copy(app_nw,`${dest}/${app.name}/nwjs.app/Contents/Resources/app.nw`)
          setStatus('app.nw')
        })
        setStatus(`${output}/${app.name}`)
      }
    }
  })
}

async function updateContent() {
  const app_nw = `${app_location}/nwjs.app/Contents/Resources/app.nw`
  const app_package = fsx.readFileSync(`${app_nw}/package.json`)
  const app = JSON.parse(app_package)

  await task('Replace icon', async ({setStatus})=> {
    const icon_name = path.join(app.window.icon)
    const icon_source = `${cwd}/build/${app.name}/nwjs.app/Contents/Resources/app.nw/${icon_name}`
    const icon_target = `${cwd}/build/${app.name}/nwjs.app/Contents/Resources/app.icns`
    await fsx.copy(icon_source,icon_target)
    setStatus('app.icns')
  })
  await task('Updade info.plist', async ({setStatus})=> {
    let plist_location = `${cwd}/build/${app.name}/nwjs.app/Contents/Info.plist`
    let plist_data = plist.readFileSync(plist_location)
    plist_data.CFBundleDisplayName = app.name
    plist_data.CFBundleIdentifier = app.product_id
    plist_data.CFBundleExecutable = app.name
    plist.writeFileSync( plist_location, plist_data )
    setStatus('Info.plist')
  })
  await task('Update InfoPlist.string', async ({setStatus})=> {
    const IPlist_path = `${cwd}/build/${app.name}/nwjs.app/Contents/Resources/en.lproj/InfoPlist.strings`
    writeStringsFile(IPlist_path, {
      'CFBundleDisplayName': app.name
    })
    setStatus(app.name)
  })  
  await task('Update Helper', async ({setStatus})=> {
    const helper_app = `${cwd}/build/${app.name}/nwjs.app/Contents/Versions/50.0.2661.102/nwjs Helper.app`
    const helper_plist = `${helper_app}/Contents/Info.plist`
    await task('Update Info.plist', async({setStatus})=> {
      // let helper_data = plist.readFileSync(helper_plist)
      // helper_data.CFBundleDisplayName = helper_data.CFBundleDisplayName.replace('nwjs', app.product_string)
      // helper_data.CFBundleExecutable = helper_data.CFBundleExecutable.replace('nwjs', app.product_string)
      // helper_data.CFBundleIdentifier = helper_data.CFBundleIdentifier.replace('io.nwjs.nw.helper', `${app.product_id}.helper`)
      //plist.writeFileSync( helper_plist, helper_data )
      // console.log(helper_data)
      setStatus('Info.plist')
    })
    await task('Rename nwjs Helper', async ({setStatus})=> {
      const helper_before = `${helper_app}/Contents/MacOS/nwjs Helper`
      const helper_after = `${helper_app}/Contents/MacOS/${app.product_string} Helper`
      //fsx.renameSync(helper_before, helper_after)
      setStatus(`MacOS/${app.product_string}`)
    })
    await task('Rename nwjs Helper.app', async({setStatus})=> {
      const helper_app_before = helper_app
      const helper_app_after = `${cwd}/build/${app.name}/nwjs.app/Contents/Versions/50.0.2661.102/${app.product_string} Helper.app`
      //fsx.renameSync(helper_app_before, helper_app_after)
      setStatus(`${app.product_string} Helper.app`)
    })
    setStatus(app.product_string)
  })
  await task('Update manifest', async ({setStatus})=> {
    const manifest = `${cwd}/build/${app.name}/nwjs.app/Contents/Resources/io.nwjs.nw.manifest`
    await task('Update .manifest', async ({setStatus})=> {
      const manifest_file = `${manifest}/Contents/Resources/io.nwjs.nw.manifest`
      const manifest_data = plist.readFileSync(manifest_file)
      manifest_data.pfm_domain = app.product_id
      plist.writeFileSync( manifest_file, manifest_data )
      setStatus(app.product_id)
    })
    await task('Rename .manifest', async ({setStatus})=> {
      const manifest_before = `${manifest}/Contents/Resources/io.nwjs.nw.manifest`
      const manifest_after = `${manifest}/Contents/Resources/${app.product_id}.manifest`
      fsx.renameSync(manifest_before, manifest_after)
      setStatus(`${app.product_id}.manifest`)
    })
    await task('Rename io.nwjs.nw.manifest', async ({setStatus})=> {
      const manifest_to = `${cwd}/build/${app.name}/nwjs.app/Contents/Resources/${app.product_id}.manifest`
      fsx.renameSync(manifest, manifest_to)
      setStatus(`${app.product_id}.manifest`)
    })
    setStatus(`${app.product_id}.manifest`)
  })
  await task('Rename nwjs', async ({setStatus})=> {
    const name_before = `${cwd}/build/${app.name}/nwjs.app/Contents/MacOS/nwjs`
    const name_after = `${cwd}/build/${app.name}/nwjs.app/Contents/MacOS/${app.name}`
    fsx.renameSync(name_before, name_after)
    setStatus(app.name)
  })
  await task('Rename .app', async ({setStatus})=> {
    const app_before = `${cwd}/build/${app.name}/nwjs.app`
    const app_after = `${cwd}/build/${app.name}/${app.name}.app`
    fsx.renameSync(app_before, app_after)
    setStatus(`${app.name}.app`)
  })
}
async function legalizeApp() {
  const app_nw = `${app_location}/nwjs.app/Contents/Resources/app.nw`
  const app_package = fsx.readFileSync(`${app_nw}/package.json`)
  const app = JSON.parse(app_package)
  const app_target = `${cwd}/build/${app.name}/${app.name}.app/Contents/MacOS/${app.name}`
  await task('Legalize app', async ({setStatus})=> {
    execSync(`chmod +x "${app_target}"`)
    execSync(`xattr -cr "${app_target}"`)
    execSync(`touch -c "${app_target}"`)
    setStatus(app.name)
  })
}

export { prepareOutput, updateContent, legalizeApp }
