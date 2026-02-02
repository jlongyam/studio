import icon from '../../src/icon/icon.js'
import fs from 'fs'
import { describe, it, before } from 'mocha'
import { assert } from 'chai'

describe('Icon.json', ()=> {
  let icon_json_file = undefined
  let icon_json = undefined
  before(()=> {
    icon_json_file = fs.readFileSync(`${process.cwd()}/test/icon/icon.json`, { encoding: 'utf-8'} )
    icon_json = JSON.stringify(icon, 0, 2)
  })
  it('Should same with JSON.stringify', ()=> {
    assert.deepEqual(icon_json, icon_json_file)
  })
})
