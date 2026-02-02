import type from '../../dist/type/type.js'

function object_(args){
  if( type(args) !== 'object' ) return String(args);
  else {
    object_.chain.args = args;
    return object_.chain;
  }
}

object_.chain = {
  args: undefined,
  valueOf: function() {
    return this.args
  },
  toString: function() {
    return String(this.args)
  },
  extend: function(o) {
    for( var i in o ) this[i] = o[i];
    return this
  } 
};

export default object_