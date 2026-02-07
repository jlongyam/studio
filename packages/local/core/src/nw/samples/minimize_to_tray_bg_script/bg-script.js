let count = 0
console.log('bg-script.js executed, count = ' + count++)
nw.Window.open('nw.html', {}, (win)=> {
  //let tray;
  
  win.on('minimize', ()=> {
    win.hide()
    let tray = new nw.Tray({ html: 'Tray', icon: 'jl.png' });
    tray.on('click', function() {
      win.show();
      win.focus();
      tray.remove();
      tray = null;
      
    });
  })
  win.on('close', ()=> {
    alert('are you sure')
    win.close(true)
  })
})