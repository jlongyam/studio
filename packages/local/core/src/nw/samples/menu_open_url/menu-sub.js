menu.bar.sub.main.append( new nw.MenuItem({ label: 'Home',
				click: ()=> { location.replace( path_home ) }
			}) )
menu.bar.sub.main.append( new nw.MenuItem({ label: 'Close',
      click: ()=> { nw.Window.get().close() }
    }) )

// register
//nw.Window.get().menu = menu.bar.main

