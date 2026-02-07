function createMenuBar( Obj ) {
  let menu_bar = new nw.Menu({ type: 'menubar' })
  Obj.forEach( obj=> {
    let key = Object.keys(obj), menu_item = {}
    key.forEach(val=> {
      let sub_menu = {}
      if( val === 'submenu' ) {
        sub_menu = new nw.Menu()
        let sub_item = {}
        Object.keys(obj.submenu).forEach( k=> {
          sub_item[k] = obj.submenu[k]
        })
        sub_menu.append(new nw.MenuItem(sub_item))
      }
      else sub_menu = obj[val]
      menu_item[val] = sub_menu
    })
    menu_bar.append(new nw.MenuItem(menu_item))
  })
  nw.Window.get().menu = menu_bar
}
/*
createMenuBar([
  {
    label: 'Main',
    submenu: {
      label: 'Exit',
      click: ()=> { alert(9) }
    }
  },
  {
    label: 'Help',
    submenu: {
      label: 'Manual'
    }
  }
])
*/