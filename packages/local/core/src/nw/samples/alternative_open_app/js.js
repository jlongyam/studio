nw.Window.open('nw.html', {
	position: 'center',
  width: 500,
  height: 200
	//focus: true
}, function(win) {
	win.on('focus', ()=> {
		// log to background console
		console.log('win on focus!')
	})
	win.on ('loaded', function(){
  // the native onload event has just occurred
		var document = win.window.document;
		//console.log(document)
		document.body.innerHTML += '<h1>Added from background</h1>'
	});
});
