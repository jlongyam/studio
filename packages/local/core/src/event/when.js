function when(str,obj,func) {
  var check = [];
  check[str] = setInterval(function(){
    if(str in obj) {
      clearInterval(check[str]);
      func();
    }
  })
}