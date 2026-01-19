import syncDirectory from 'sync-directory'

const srcDir = './src'
const targetDir = './bin/nwjs-sdk-v0.14.7-osx-x64/nwjs.app/Contents/Resources/app.nw'
const watch = false;
//console.log(typeof syncDirectory)
syncDirectory(srcDir, targetDir, {
  deleteOrphaned: true,
  watch: watch
});