class log {
  static string(i) {
    let d = document, p = d.createElement('pre')
    p.textContent = i, p.className = 'log'
    d.body.appendChild(p)
  }
  static json(i) {
    this.string( JSON.stringify(i,0,2) )
  }
}