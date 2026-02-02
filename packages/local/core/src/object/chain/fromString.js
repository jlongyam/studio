import object_ from "../object_.js";

function getNestedProperty(obj, path, defaultValue) {
  const value = path.split('.').reduce((acc, currentProp) => {
    
    return acc && acc.hasOwnProperty(currentProp) ? acc[currentProp] : undefined;
  }, obj); 

  
  return value !== undefined ? value : defaultValue;
}
object_.chain.extend({
  fromString: function(strDot) {
    return getNestedProperty(this.args, strDot)
  }
});
/*
let obj = {
  name: 'NAME',
  foo: 'FOO',
  other: {
    bar: 'BAR'
  }
}
let o = {}

o.name = object_(obj).fromString('name')
o.bar = object_(obj).fromString('other.bar')

console.log(o)
*/
export default object_
