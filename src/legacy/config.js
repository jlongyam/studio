const dir = {
  home: process.env.HOME,
  get local() {
    return this.home + '/.local'
  },
  get studio() {
    return this.local + '/studio'
  },
  get legacy() {
    return this.studio + '/legacy'
  },
  get archive() {
    return this.studio + '/archive'
  }
}
const node = {
  dl: 'https://nodejs.org/dist/(archive_exists && archive_file_exists)',
  ext: 'tar.gz',
  osx: 'node-v5.12.0-darwin-x64'
}
const nw = {
  dl: 'https://dl.nwjs.io/v0.14.7',
  ext: 'zip',
  osx: 'nwjs-v0.14.7-osx-x64',
  sdk: {
    osx: 'nwjs-sdk-v0.14.7-osx-x64'
  }
}
export { dir, node, nw }