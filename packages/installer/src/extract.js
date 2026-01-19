import decompress from 'decompress'

async function Extract(option = {}) {
  if (!option.target && !option.location ) return
  let config = {
    target: option.target,
    location: option.location,
    callback: option.callback || false
  }
  console.log('Extract start')
  const progress = await decompress( config.target, config.location)
  console.log('Extract done')
  if(config.callback) config.callback()
}


Extract({
  target: './archive/nwjs-sdk-v0.14.7-osx-x64.zip',
  location: './bin',
  callback: function() {
    console.log('READY')
  }
})

export default Extract