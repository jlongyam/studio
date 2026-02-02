import type from '../type/type.js'
import { Window } from 'happy-dom'

let window = new Window()
let document = window.document

// ===
// option:string -> select attribute
// > dom('span', 'id')
// option:array
// > dom('span', ['id', ''])
// option:object -> select attribute and it's value
// > dom('span, { id: 'span_1', class: 'italic' })
function dom(s_tag, t_option) {
  var tag = s_tag || type(s_tag) === 'string' ? s_tag : false,
    option = t_option || false, d = document,
    els = tag ? d.getElementsByTagName(tag) : false,
    result = false
  ;
  if (option) {
    var a_tag = [], i, a, o,
      s_option = type(option) === 'string',
      a_option = type(option) === 'Array',
      o_option = type(option) === 'Object';
    console.log(type(option))
    for (i = 0; i < els.length; i++) {
      if (s_option) {
        if (els[i].getAttribute(option) !== null) a_tag.push(els[i])
      }
      if (a_option) {
        for (a in option) {
          if (els[i].getAttribute(option[a]) !== null) {
            a_tag.push(els[i]);
            break;
          }
        }
      }
      if (o_option) {
        for (o in option) {
          var el_attr = els[i].getAttribute(o)
          if (el_attr !== null) {
            if (el_attr === option[o]) {
              a_tag.push(els[i]);
              break;
            }
          }
        }
      }
    }
    try {
      if (a_tag.length === 0) result = false
      else if (a_tag.length === 1) result = a_tag[0]
      else result = a_tag
    } catch (e) {
      throw e.message
    }
  }
  else {
    if (els.length === 0) result = false;
    else if (els.length === 1) result = els[0];
    else result = els
  }
  dom.target.object = result
  return dom.target
}

dom.target = {
  object: undefined,
  valueOf: function () {
    return this.object
  },
  extend: function (o) {
    for (let i in o) this[i] = o[i]
    return this
  }
}
// example
let span = document.createElement('span')
span.textContent = 'SPAN'
span.id = 'span'
document.body.appendChild(span)

let span2 = document.createElement('span')
span2.textContent = 'SPAN'
span2.id = 'span2'
document.body.appendChild(span2)

dom('span', {'id': 'span2'})

console.log(type(dom.target.object) + ': ' + dom.target.object)
if(type(dom.target.object) !== false) {
  const el = dom.target.object
  console.log(el.textContent)
  dom.target.extend({ cool: ()=> {
    console.log(el.tagName)
  }})
  dom.target.cool()
}

// ! NOTE
// element property can be extend easily
// el.new_prop = {}
// from console:
// > let body = document.body
// < undefined
// > body.exted = {}
// < {}
// > body.exted.events = [1,2,3]
// < [1, 2, 3] (3)
// > body.exted.events
// < [1, 2, 3] (3)
// LOL
// ===
await window.happyDOM.abort()
window.close()