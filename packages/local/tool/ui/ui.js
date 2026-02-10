var ui = (function (exports) {
	'use strict';
	function emit (type, detail, elem = document) {
		let event = new CustomEvent(`ui:${type}`, {
			bubbles: true,
			cancelable: true,
			detail: detail
		});
		return elem.dispatchEvent(event);
	}
	function getElem (elem) {
		return typeof elem === 'string' ? document.querySelector(elem) : elem;
	}
	function getType (obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}
	function handler (name, data) {
		let type = 'sync' + (name ? `-${name}` : '');
		return {
			get (obj, prop) {
				if (prop === '_issync') return true;
				if (['object', 'array'].includes(getType(obj[prop])) && !obj[prop]._issync) {
					obj[prop] = new Proxy(obj[prop], handler(name));
				}
				return obj[prop];
			},
			set (obj, prop, value) {
				if (obj[prop] === value) return true;
				obj[prop] = value;
				emit(type, {prop, value, action: 'set'});
				return true;
			},
			deleteProperty (obj, prop) {
				delete obj[prop];
				emit(type, {prop, value: obj[prop], action: 'delete'});
				return true;
			}
		};
	}
	function sync (data = {}, name = '') {
		data = ['array', 'object'].includes(getType(data)) ? data : {value: data};
		return new Proxy(data, handler(name));
	}
	class Model {
		constructor (data, actions, name = '') {
			let type = 'sync' + (name ? `-${name}` : '');
			Object.defineProperties(this, {
				value: {
					get () {
						return structuredClone(data);
					},
					set () {
						return true;
					}
				}
			});
			for (let fn in actions) {
				if (typeof actions[fn] !== 'function') continue;
				this[fn] = function (...args) {
					actions[fn](data, ...args);
					emit(type, data);
				};
			}
		}
	}
	function model (data = {}, setters = {}, name = '') {
		return new Model(data, setters, name);
	}
	let formFields = ['input', 'option', 'textarea'];
	let formAtts = ['value', 'checked', 'selected'];
	let formAttsNoVal = ['checked', 'selected'];
	function stringToHTML (str) {
		let parser = new DOMParser();
		let doc = parser.parseFromString(`<body><template>${str}</template></body>`, 'text/html');
		if (doc.body) {
			return doc.body.firstElementChild.content;
		}
		return document.createElement('body');
	}
	function isFalsy (str) {
		return ['false', 'null', 'undefined', '0', '-0', 'NaN', '0n', '-0n'].includes(str);
	}
	function listen (elem, event, val, events) {
		if (!event.startsWith('on') || !events) return;
		if (!!elem[event]) return;
		let fnName = val.split('(')[0];
		let listener = events[fnName];
		if (!listener) return;
		elem[event] = listener;
	}
	function skipAttribute (name, value) {
		let val = value.replace(/\s+/g, '').toLowerCase();
		if (['src', 'href', 'xlink:href'].includes(name)) {
			if (val.includes('javascript:') || val.includes('data:text/html')) return true;
		}
		if (name.startsWith('on') || name.startsWith('@on') || name.startsWith('#on')) return true;
	}
	function addAttribute (elem, att, val, events) {
		listen(elem, att, val, events);
		if (skipAttribute(att, val)) return;
		if (formAtts.includes(att)) {
			elem[att] = att === 'value' ? val : ' ';
		}
		elem.setAttribute(att, val);
	}
	function removeAttribute (elem, att) {
		if (formAtts.includes(att)) {
			elem[att] = '';
		}
		elem.removeAttribute(att);
	}
	function diffAttributes (template, existing, events) {
		if (template.nodeType !== 1) return;
		let templateAtts = template.attributes;
		let existingAtts = existing.attributes;
		for (let {name, value} of templateAtts) {
			if (name.startsWith('#')) continue;
			if (formAtts.includes(name) && formFields.includes(template.tagName.toLowerCase())) continue;
			let attName = name.startsWith('@') ? name.slice(1) : name;
			if (formAttsNoVal.includes(attName) && isFalsy(value)) {
				removeAttribute(existing, attName);
				continue;
			}
			addAttribute(existing, attName, value, events);
		}
		for (let {name, value} of existingAtts) {
			if (templateAtts[name]) continue;
			if (formAtts.includes(name) && formFields.includes(existing.tagName.toLowerCase())) continue;
			removeAttribute(existing, name);
		}
	}
	function addDefaultAtts (elem, events) {
		if (elem.nodeType !== 1) return;
		for (let {name, value} of elem.attributes) {
			if (skipAttribute(name, value)) {
				removeAttribute(elem, name);
				listen(elem, name, value, events);
				continue;
			}
			if (!name.startsWith('@') && !name.startsWith('#')) continue;
			let attName = name.slice(1);
			removeAttribute(elem, name);
			if (formAttsNoVal.includes(attName) && isFalsy(value)) continue;
			addAttribute(elem, attName, value, events);
		}
		if (elem.childNodes) {
			for (let node of elem.childNodes) {
				addDefaultAtts(node, events);
			}
		}
	}
	function getNodeContent (node) {
		return node.childNodes && node.childNodes.length ? null : node.textContent;
	}
	function isDifferentNode (node1, node2) {
		return (
			(typeof node1.nodeType === 'number' && node1.nodeType !== node2.nodeType) ||
			(typeof node1.tagName === 'string' && node1.tagName !== node2.tagName) ||
			(typeof node1.id === 'string' && !!node1.id && node1.id !== node2.id) ||
			('getAttribute' in node1 && 'getAttribute' in node2 && node1.getAttribute('key') !== node2.getAttribute('key')) ||
			(typeof node1.src === 'string' && !!node1.src && node1.src !== node2.src)
		);
	}
	function aheadInTree (node, existing) {
		if (node.nodeType !== 1) return;
		let id = node.getAttribute('id');
		let key = node.getAttribute('key');
		if (!id || !key) return;
		let selector = id ? `#${id}` : `[key="${key}"]`;
		return existing.querySelector(`:scope > ${selector}`);
	}
	function trimExtraNodes (existingNodes, templateNodes) {
		let extra = existingNodes.length - templateNodes.length;
		if (extra < 1)  return;
		for (; extra > 0; extra--) {
			existingNodes[existingNodes.length - 1].remove();
		}
	}
	function removeScripts (elem) {
		let scripts = elem.querySelectorAll('script');
		for (let script of scripts) {
			script.remove();
		}
	}
	function diff (template, existing, events) {
		let templateNodes = template.childNodes;
		let existingNodes = existing.childNodes;
		if (removeScripts(template)) return;
		templateNodes.forEach(function (node, index) {
			if (!existingNodes[index]) {
				let clone = node.cloneNode(true);
				addDefaultAtts(clone, events);
				existing.append(clone);
				return;
			}
			if (isDifferentNode(node, existingNodes[index])) {
				let ahead = aheadInTree(node, existing);
				if (!ahead) {
					let clone = node.cloneNode(true);
					addDefaultAtts(clone, events);
					existingNodes[index].before(clone);
					return;
				}
				existingNodes[index].before(ahead);
			}
			if (templateNodes[index] && 'hasAttribute' in templateNodes[index] && templateNodes[index].hasAttribute('ui-ignore')) return;
			diffAttributes(node, existingNodes[index], events);
			if (node.nodeName.includes('-')) return;
			let templateContent = getNodeContent(node);
			if (templateContent && templateContent !== getNodeContent(existingNodes[index])) {
				existingNodes[index].textContent = templateContent;
			}
			if (!node.childNodes.length && existingNodes[index].childNodes.length) {
				existingNodes[index].innerHTML = '';
				return;
			}
			if (!existingNodes[index].childNodes.length && node.childNodes.length) {
				let fragment = document.createDocumentFragment();
				diff(node, fragment, events);
				existingNodes[index].appendChild(fragment);
				return;
			}
			if (node.childNodes.length) {
				diff(node, existingNodes[index], events);
			}
		});
		trimExtraNodes(existingNodes, templateNodes);
	}
	function render (elem, template, events) {
		let node = getElem(elem);
		let html = stringToHTML(template);
		if (!emit('before-render', null, node)) return;
		diff(html, node, events);
		emit('render', null, node);
	}
	function createHandler (instance) {
		return function handler (event) {
			instance.render();
		};
	}
	class Display {
		constructor (elem, template, options) {
			this.elem = elem;
			this.template = template;
			this.syncs = options.syncs ? options.syncs.map((sync) => `ui:sync-${sync}`) : ['ui:sync'];
			this.events = options.events;
			this.handler = createHandler(this);
			this.debounce = null;
			this.start();
		}
		start () {
			for (let sync of this.syncs) {
				document.addEventListener(sync, this.handler);
			}
			this.render();
			emit('start', null, getElem(this.elem));
		}
		stop () {
			for (let sync of this.syncs) {
				document.removeEventListener(sync, this.handler);
			}
			emit('stop', null, getElem(this.elem));
		}
		render () {
			let self = this;
			if (self.debounce) {
				window.cancelAnimationFrame(self.debounce);
			}
			self.debounce = window.requestAnimationFrame(function () {
				render(self.elem, self.template(), self.events);
			});
		}
	}
	function display (elem, template, options = {}) {
		return new Display(elem, template, options);
	}
	let focusOn;
	function setFocus () {
		setTimeout(function () {
			let elem = document.querySelector(focusOn);
			focusOn = null;
			if (!elem) return;
			elem.focus();
			if (document.activeElement === elem) return;
			elem.setAttribute('tabindex', -1);
			elem.focus();
		}, 1);
	}
	function focus (selector) {
		if (!selector || typeof selector !== 'string') return;
		focusOn = selector;
		document.addEventListener('ui:render', setFocus, {once: true});
	}
	exports.display = display;  // component
	exports.focus = focus;      // focus
	exports.render = render;    // render
	exports.sync = sync;        // signal
	exports.model = model;      // store
	Object.defineProperty(exports, '__esModule', { value: true });
	return exports;
})({});
