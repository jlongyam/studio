import syncDirectory from 'sync-directory'

function sycn(srcDir, targetDir, watch = false) {
  syncDirectory(srcDir, targetDir, {
    deleteOrphaned: true,
    watch: watch
  })
}
export default sycn