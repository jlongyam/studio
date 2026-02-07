// watch is non-stop, when is stopped
function watchObject(obj, cb) {
  let last = JSON.stringify(obj);
  setInterval( function() {
    let current = JSON.stringify(obj);
    if (current !== last ) {
      cb(current)
    }
  }, 500);
}

function when(name, o, cb) {
  let stat = setInterval(function() {
    if(name in o) {
      cb(o);
      clearInterval(stat)
    }
  }, 500);
}

let obj = {one: 'One'};
// watchObject(obj, function(result) {
//   console.log(result)
// });
// console.log('one' in obj)

when('four', obj, function(result) {
  console.log(result)
});

setTimeout(function() {
  obj.two = 'Two'
}, 1000);

setTimeout(function() {
  obj.three = 'Three'
}, 2000);

setTimeout(function() {
  obj.four = 'Four'
}, 3000);

setTimeout(function() {
  delete obj.one
}, 4000);

setTimeout(function() {
  delete obj.three
}, 4000);