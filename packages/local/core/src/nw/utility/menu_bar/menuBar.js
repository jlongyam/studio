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
