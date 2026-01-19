import {folder} from '@local/fs'

const local_bin = `${process.env.HOME}/.local/bin`
console.log(await folder.list(local_bin));