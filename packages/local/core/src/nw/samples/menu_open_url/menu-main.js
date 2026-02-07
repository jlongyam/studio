const path_manual = 'file:///C:/Users/Admin/Project/github/private/nw/manual'
const path_home = '/'+nw.App.manifest.main.split('/').pop()
// create
let menu = {}
menu.bar = {}
menu.bar.sub = {}
  // Main
  menu.bar.main = new nw.Menu({ type: 'menubar' })
    menu.bar.sub.main = new nw.Menu()
    menu.bar.sub.main.append( new nw.MenuItem({ label: 'Reload',
      click: ()=> { location.reload() }
    }) )
		menu.bar.sub.main.append( new nw.MenuItem({ label: 'DevTool',
      click: ()=> { nw.Window.get().showDevTools() }
    }) )
  menu.bar.main.append( new nw.MenuItem({
    label: 'Main',
    submenu: menu.bar.sub.main
  }))
  // Help
  menu.bar.help = new nw.Menu({ type: 'menubar' })
    menu.bar.sub.help = new nw.Menu()
    menu.bar.sub.help.append( new nw.MenuItem({ label: 'Docs',
      click: ()=> {
        nw.Window.open( path_manual+'/docs/index.html', {}, (win_docs)=> {
          win_docs.maximize()
        })
      }
    }) )
    menu.bar.sub.help.append( new nw.MenuItem({ label: 'Wiki',
      click: ()=> {
        nw.Window.open(path_manual+'/wiki/index.html', {}, (win_wiki)=> {
          win_wiki.maximize()
        } )
      }
    }) )
  menu.bar.main.append( new nw.MenuItem({
    label: 'Help',
    submenu: menu.bar.sub.help
  })) 
// register
nw.Window.get().menu = menu.bar.main

