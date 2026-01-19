import download from 'download'

async function Download(option = {}) {
  if (!option.from && !option.to) return
  let config = {
    from: option.from,
    to: option.to,
    extract: option.extract || false,
    filename: option.filename || undefined,
    callback: option.callback || false
  }
  console.log('Download start')
  await download(
    config.from,
    config.to, {
      extract: config.extract,
      filename: config.filename
    }
  )
  console.log('Download done')
  if(config.callback) config.callback()
}

Download({
  from: 'https://dl.nwjs.io/v0.14.7/nwjs-sdk-v0.14.7-osx-x64.zip',
  to: './archive',
  callback: function() {
    console.log('READY')
  }
})
