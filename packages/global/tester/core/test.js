import type from './type.js'

export default function(option) {
  let config = {
    context: option.context || false,
    name: option.name || false,
    call: option.call ? option.call() : 0,
    should: type(option.should) === 'Boolean' ? String(option.should) : option.should || '0'
  },
  result = {}
  
  if(config.context) result.context = config.context
  if(config.name) result.test = config.name
  result.should = config.should
  result.pass = ( String(config.should) === String(config.call) )
  
  return result
}