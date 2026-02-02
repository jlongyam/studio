var re, hasRequiredRe, define_property, hasRequiredDefine_property, has_define_property_support, hasRequiredHas_define_property_support, builtin, hasRequiredBuiltin, is_number, hasRequiredIs_number, zero_pad, hasRequiredZero_pad, format_integer, hasRequiredFormat_integer, is_string$1, hasRequiredIs_string$1, format_double, hasRequiredFormat_double, space_pad, hasRequiredSpace_pad, main$i, hasRequiredMain$i, lib$j, hasRequiredLib$j, main$h, hasRequiredMain$h, lib$i, hasRequiredLib$i, is_string, hasRequiredIs_string, main$g, hasRequiredMain$g, lib$h, hasRequiredLib$h, polyfill$2, hasRequiredPolyfill$2, lib$g, hasRequiredLib$g, main$f, hasRequiredMain$f, lib$f, hasRequiredLib$f, primitive, hasRequiredPrimitive, main$e, hasRequiredMain$e, lib$e, hasRequiredLib$e, main$d, hasRequiredMain$d, lib$d, hasRequiredLib$d, tostring$1, hasRequiredTostring$1, main$c, hasRequiredMain$c, main$b, hasRequiredMain$b, lib$c, hasRequiredLib$c, main$a, hasRequiredMain$a, lib$b, hasRequiredLib$b, tostringtag, hasRequiredTostringtag, polyfill$1, hasRequiredPolyfill$1, lib$a, hasRequiredLib$a, main$9, hasRequiredMain$9, lib$9, hasRequiredLib$9, tostring, hasRequiredTostring, try2serialize, hasRequiredTry2serialize, object, hasRequiredObject, main$8, hasRequiredMain$8, lib$8, hasRequiredLib$8, codegen, hasRequiredCodegen, self_1, hasRequiredSelf, window_1, hasRequiredWindow, global$1, hasRequiredGlobal, global_this, hasRequiredGlobal_this, main$7, hasRequiredMain$7, lib$7, hasRequiredLib$7, nodelist, hasRequiredNodelist, typedarray_1, hasRequiredTypedarray, check_1, hasRequiredCheck, main$6, hasRequiredMain$6, regexp, hasRequiredRegexp, lib$6, hasRequiredLib$6, main$5, hasRequiredMain$5, lib$5, hasRequiredLib$5, main$4, hasRequiredMain$4, lib$4, hasRequiredLib$4, main$3, hasRequiredMain$3, lib$3, hasRequiredLib$3, main$2, hasRequiredMain$2, lib$2, hasRequiredLib$2, main$1, hasRequiredMain$1, lib$1, hasRequiredLib$1, main, hasRequiredMain, polyfill, hasRequiredPolyfill, lib, hasRequiredLib, commonjsGlobal = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
}

function requireBuiltin() {
  if (hasRequiredBuiltin) return builtin;
  hasRequiredBuiltin = 1;
  var defineProperty = Object.defineProperty;
  return builtin = defineProperty;
}

function requireIs_number() {
  return hasRequiredIs_number ? is_number : (hasRequiredIs_number = 1, is_number = function(value) {
    return "number" == typeof value;
  });
}

function requireZero_pad() {
  if (hasRequiredZero_pad) return zero_pad;
  function zeros(n) {
    var i, out = "";
    for (i = 0; i < n; i++) out += "0";
    return out;
  }
  return hasRequiredZero_pad = 1, zero_pad = function(str, width, right) {
    var negative = !1, pad = width - str.length;
    return pad < 0 || (function(str) {
      return "-" === str[0];
    }(str) && (negative = !0, str = str.substr(1)), str = right ? str + zeros(pad) : zeros(pad) + str, 
    negative && (str = "-" + str)), str;
  };
}

function requireMain$g() {
  if (hasRequiredMain$g) return main$g;
  hasRequiredMain$g = 1;
  var interpolate = function() {
    if (hasRequiredLib$j) return lib$j;
    hasRequiredLib$j = 1;
    var main = function() {
      if (hasRequiredMain$i) return main$i;
      hasRequiredMain$i = 1;
      var formatInteger = function() {
        if (hasRequiredFormat_integer) return format_integer;
        hasRequiredFormat_integer = 1;
        var isNumber = requireIs_number(), zeroPad = requireZero_pad(), lowercase = String.prototype.toLowerCase, uppercase = String.prototype.toUpperCase;
        return format_integer = function(token) {
          var base, out, i;
          switch (token.specifier) {
           case "b":
            base = 2;
            break;

           case "o":
            base = 8;
            break;

           case "x":
           case "X":
            base = 16;
            break;

           default:
            base = 10;
          }
          if (out = token.arg, i = parseInt(out, 10), !isFinite(i)) {
            if (!isNumber(out)) throw new Error("invalid integer. Value: " + out);
            i = 0;
          }
          return i < 0 && ("u" === token.specifier || 10 !== base) && (i = 4294967295 + i + 1), 
          i < 0 ? (out = (-i).toString(base), token.precision && (out = zeroPad(out, token.precision, token.padRight)), 
          out = "-" + out) : (out = i.toString(base), i || token.precision ? token.precision && (out = zeroPad(out, token.precision, token.padRight)) : out = "", 
          token.sign && (out = token.sign + out)), 16 === base && (token.alternate && (out = "0x" + out), 
          out = token.specifier === uppercase.call(token.specifier) ? uppercase.call(out) : lowercase.call(out)), 
          8 === base && token.alternate && "0" !== out.charAt(0) && (out = "0" + out), out;
        };
      }(), isString = hasRequiredIs_string$1 ? is_string$1 : (hasRequiredIs_string$1 = 1, 
      is_string$1 = function(value) {
        return "string" == typeof value;
      }), formatDouble = function() {
        if (hasRequiredFormat_double) return format_double;
        hasRequiredFormat_double = 1;
        var isNumber = requireIs_number(), abs = Math.abs, lowercase = String.prototype.toLowerCase, uppercase = String.prototype.toUpperCase, replace = String.prototype.replace, RE_EXP_POS_DIGITS = /e\+(\d)$/, RE_EXP_NEG_DIGITS = /e-(\d)$/, RE_ONLY_DIGITS = /^(\d+)$/, RE_DIGITS_BEFORE_EXP = /^(\d+)e/, RE_TRAILING_PERIOD_ZERO = /\.0$/, RE_PERIOD_ZERO_EXP = /\.0*e/, RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;
        return format_double = function(token) {
          var digits, out, f = parseFloat(token.arg);
          if (!isFinite(f)) {
            if (!isNumber(token.arg)) throw new Error("invalid floating-point number. Value: " + out);
            f = token.arg;
          }
          switch (token.specifier) {
           case "e":
           case "E":
            out = f.toExponential(token.precision);
            break;

           case "f":
           case "F":
            out = f.toFixed(token.precision);
            break;

           case "g":
           case "G":
            abs(f) < 1e-4 ? ((digits = token.precision) > 0 && (digits -= 1), out = f.toExponential(digits)) : out = f.toPrecision(token.precision), 
            token.alternate || (out = replace.call(out, RE_ZERO_BEFORE_EXP, "$1e"), out = replace.call(out, RE_PERIOD_ZERO_EXP, "e"), 
            out = replace.call(out, RE_TRAILING_PERIOD_ZERO, ""));
            break;

           default:
            throw new Error("invalid double notation. Value: " + token.specifier);
          }
          return out = replace.call(out, RE_EXP_POS_DIGITS, "e+0$1"), out = replace.call(out, RE_EXP_NEG_DIGITS, "e-0$1"), 
          token.alternate && (out = replace.call(out, RE_ONLY_DIGITS, "$1."), out = replace.call(out, RE_DIGITS_BEFORE_EXP, "$1.e")), 
          f >= 0 && token.sign && (out = token.sign + out), token.specifier === uppercase.call(token.specifier) ? uppercase.call(out) : lowercase.call(out);
        };
      }(), spacePad = function() {
        if (hasRequiredSpace_pad) return space_pad;
        function spaces(n) {
          var i, out = "";
          for (i = 0; i < n; i++) out += " ";
          return out;
        }
        return hasRequiredSpace_pad = 1, space_pad = function(str, width, right) {
          var pad = width - str.length;
          return pad < 0 ? str : str = right ? str + spaces(pad) : spaces(pad) + str;
        };
      }(), zeroPad = requireZero_pad(), fromCharCode = String.fromCharCode, isArray = Array.isArray;
      function isnan(value) {
        return value != value;
      }
      function initialize(token) {
        var out = {};
        return out.specifier = token.specifier, out.precision = void 0 === token.precision ? 1 : token.precision, 
        out.width = token.width, out.flags = token.flags || "", out.mapping = token.mapping, 
        out;
      }
      return main$i = function(tokens) {
        var hasPeriod, flags, token, flag, num, out, pos, i, j, arguments$1 = arguments;
        if (!isArray(tokens)) throw new TypeError("invalid argument. First argument must be an array. Value: `" + tokens + "`.");
        for (out = "", pos = 1, i = 0; i < tokens.length; i++) if (token = tokens[i], isString(token)) out += token; else {
          if (hasPeriod = void 0 !== token.precision, !(token = initialize(token)).specifier) throw new TypeError("invalid argument. Token is missing `specifier` property. Index: `" + i + "`. Value: `" + token + "`.");
          for (token.mapping && (pos = token.mapping), flags = token.flags, j = 0; j < flags.length; j++) switch (flag = flags.charAt(j)) {
           case " ":
            token.sign = " ";
            break;

           case "+":
            token.sign = "+";
            break;

           case "-":
            token.padRight = !0, token.padZeros = !1;
            break;

           case "0":
            token.padZeros = flags.indexOf("-") < 0;
            break;

           case "#":
            token.alternate = !0;
            break;

           default:
            throw new Error("invalid flag: " + flag);
          }
          if ("*" === token.width) {
            if (token.width = parseInt(arguments$1[pos], 10), pos += 1, isnan(token.width)) throw new TypeError("the argument for * width at position " + pos + " is not a number. Value: `" + token.width + "`.");
            token.width < 0 && (token.padRight = !0, token.width = -token.width);
          }
          if (hasPeriod && "*" === token.precision) {
            if (token.precision = parseInt(arguments$1[pos], 10), pos += 1, isnan(token.precision)) throw new TypeError("the argument for * precision at position " + pos + " is not a number. Value: `" + token.precision + "`.");
            token.precision < 0 && (token.precision = 1, hasPeriod = !1);
          }
          switch (token.arg = arguments$1[pos], token.specifier) {
           case "b":
           case "o":
           case "x":
           case "X":
           case "d":
           case "i":
           case "u":
            hasPeriod && (token.padZeros = !1), token.arg = formatInteger(token);
            break;

           case "s":
            token.maxWidth = hasPeriod ? token.precision : -1, token.arg = String(token.arg);
            break;

           case "c":
            if (!isnan(token.arg)) {
              if ((num = parseInt(token.arg, 10)) < 0 || num > 127) throw new Error("invalid character code. Value: " + token.arg);
              token.arg = isnan(num) ? String(token.arg) : fromCharCode(num);
            }
            break;

           case "e":
           case "E":
           case "f":
           case "F":
           case "g":
           case "G":
            hasPeriod || (token.precision = 6), token.arg = formatDouble(token);
            break;

           default:
            throw new Error("invalid specifier: " + token.specifier);
          }
          token.maxWidth >= 0 && token.arg.length > token.maxWidth && (token.arg = token.arg.substring(0, token.maxWidth)), 
          token.padZeros ? token.arg = zeroPad(token.arg, token.width || token.precision, token.padRight) : token.width && (token.arg = spacePad(token.arg, token.width, token.padRight)), 
          out += token.arg || "", pos += 1;
        }
        return out;
      }, main$i;
    }();
    return lib$j = main;
  }(), tokenize = function() {
    if (hasRequiredLib$i) return lib$i;
    hasRequiredLib$i = 1;
    var main = function() {
      if (hasRequiredMain$h) return main$h;
      hasRequiredMain$h = 1;
      var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;
      function parse(match) {
        var token = {
          mapping: match[1] ? parseInt(match[1], 10) : void 0,
          flags: match[2],
          width: match[3],
          precision: match[5],
          specifier: match[6]
        };
        return "." === match[4] && void 0 === match[5] && (token.precision = "1"), token;
      }
      return main$h = function(str) {
        var content, tokens, match, prev;
        for (tokens = [], prev = 0, match = RE.exec(str); match; ) (content = str.slice(prev, RE.lastIndex - match[0].length)).length && tokens.push(content), 
        tokens.push(parse(match)), prev = RE.lastIndex, match = RE.exec(str);
        return (content = str.slice(prev)).length && tokens.push(content), tokens;
      };
    }();
    return lib$i = main;
  }(), isString = hasRequiredIs_string ? is_string : (hasRequiredIs_string = 1, is_string = function(value) {
    return "string" == typeof value;
  });
  return main$g = function format(str) {
    var args, i, arguments$1 = arguments;
    if (!isString(str)) throw new TypeError(format("invalid argument. First argument must be a string. Value: `%s`.", str));
    for (args = [ tokenize(str) ], i = 1; i < arguments.length; i++) args.push(arguments$1[i]);
    return interpolate.apply(null, args);
  }, main$g;
}

function requireLib$h() {
  if (hasRequiredLib$h) return lib$h;
  hasRequiredLib$h = 1;
  var main = requireMain$g();
  return lib$h = main;
}

function requireLib$g() {
  if (hasRequiredLib$g) return lib$g;
  hasRequiredLib$g = 1;
  var defineProperty, hasDefinePropertySupport = function() {
    if (hasRequiredHas_define_property_support) return has_define_property_support;
    hasRequiredHas_define_property_support = 1;
    var defineProperty = function() {
      if (hasRequiredDefine_property) return define_property;
      hasRequiredDefine_property = 1;
      var main = "function" == typeof Object.defineProperty ? Object.defineProperty : null;
      return define_property = main;
    }();
    return has_define_property_support = function() {
      try {
        return defineProperty({}, "x", {}), !0;
      } catch (err) {
        return !1;
      }
    };
  }(), builtin = requireBuiltin(), polyfill = function() {
    if (hasRequiredPolyfill$2) return polyfill$2;
    hasRequiredPolyfill$2 = 1;
    var format = requireLib$h(), objectProtoype = Object.prototype, toStr = objectProtoype.toString, defineGetter = objectProtoype.__defineGetter__, defineSetter = objectProtoype.__defineSetter__, lookupGetter = objectProtoype.__lookupGetter__, lookupSetter = objectProtoype.__lookupSetter__;
    return polyfill$2 = function(obj, prop, descriptor) {
      var prototype, hasValue, hasGet, hasSet;
      if ("object" != typeof obj || null === obj || "[object Array]" === toStr.call(obj)) throw new TypeError(format("invalid argument. First argument must be an object. Value: `%s`.", obj));
      if ("object" != typeof descriptor || null === descriptor || "[object Array]" === toStr.call(descriptor)) throw new TypeError(format("invalid argument. Property descriptor must be an object. Value: `%s`.", descriptor));
      if ((hasValue = "value" in descriptor) && (lookupGetter.call(obj, prop) || lookupSetter.call(obj, prop) ? (prototype = obj.__proto__, 
      obj.__proto__ = objectProtoype, delete obj[prop], obj[prop] = descriptor.value, 
      obj.__proto__ = prototype) : obj[prop] = descriptor.value), hasGet = "get" in descriptor, 
      hasSet = "set" in descriptor, hasValue && (hasGet || hasSet)) throw new Error("invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.");
      return hasGet && defineGetter && defineGetter.call(obj, prop, descriptor.get), hasSet && defineSetter && defineSetter.call(obj, prop, descriptor.set), 
      obj;
    };
  }();
  return defineProperty = hasDefinePropertySupport() ? builtin : polyfill, lib$g = defineProperty;
}

function requireLib$f() {
  if (hasRequiredLib$f) return lib$f;
  hasRequiredLib$f = 1;
  var main = function() {
    if (hasRequiredMain$f) return main$f;
    hasRequiredMain$f = 1;
    var defineProperty = requireLib$g();
    return main$f = function(obj, prop, value) {
      defineProperty(obj, prop, {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: value
      });
    };
  }();
  return lib$f = main;
}

function requirePrimitive() {
  return hasRequiredPrimitive ? primitive : (hasRequiredPrimitive = 1, primitive = function(value) {
    return "boolean" == typeof value;
  });
}

function requireLib$d() {
  if (hasRequiredLib$d) return lib$d;
  hasRequiredLib$d = 1;
  var main = function() {
    if (hasRequiredMain$d) return main$d;
    hasRequiredMain$d = 1;
    var FLG = function() {
      if (hasRequiredLib$e) return lib$e;
      hasRequiredLib$e = 1;
      var main = hasRequiredMain$e ? main$e : (hasRequiredMain$e = 1, main$e = function() {
        return "function" == typeof Symbol && "symbol" == typeof Symbol("foo");
      });
      return lib$e = main;
    }()();
    return main$d = function() {
      return FLG && "symbol" == typeof Symbol.toStringTag;
    };
  }();
  return lib$d = main;
}

function requireTostring$1() {
  if (hasRequiredTostring$1) return tostring$1;
  hasRequiredTostring$1 = 1;
  var toStr = Object.prototype.toString;
  return tostring$1 = toStr;
}

function requireLib$b() {
  if (hasRequiredLib$b) return lib$b;
  hasRequiredLib$b = 1;
  var main = function() {
    if (hasRequiredMain$a) return main$a;
    hasRequiredMain$a = 1;
    var Sym = "function" == typeof Symbol ? Symbol : void 0;
    return main$a = Sym;
  }();
  return lib$b = main;
}

function requirePolyfill$1() {
  if (hasRequiredPolyfill$1) return polyfill$1;
  hasRequiredPolyfill$1 = 1;
  var hasOwnProp = function() {
    if (hasRequiredLib$c) return lib$c;
    hasRequiredLib$c = 1;
    var main = function() {
      if (hasRequiredMain$b) return main$b;
      hasRequiredMain$b = 1;
      var has = Object.prototype.hasOwnProperty;
      return main$b = function(value, property) {
        return null != value && has.call(value, property);
      };
    }();
    return lib$c = main;
  }(), toStringTag = function() {
    if (hasRequiredTostringtag) return tostringtag;
    hasRequiredTostringtag = 1;
    var Symbol = requireLib$b(), toStrTag = "function" == typeof Symbol ? Symbol.toStringTag : "";
    return tostringtag = toStrTag;
  }(), toStr = requireTostring$1();
  return polyfill$1 = function(v) {
    var isOwn, tag, out;
    if (null == v) return toStr.call(v);
    tag = v[toStringTag], isOwn = hasOwnProp(v, toStringTag);
    try {
      v[toStringTag] = void 0;
    } catch (err) {
      return toStr.call(v);
    }
    return out = toStr.call(v), isOwn ? v[toStringTag] = tag : delete v[toStringTag], 
    out;
  };
}

function requireLib$a() {
  if (hasRequiredLib$a) return lib$a;
  hasRequiredLib$a = 1;
  var main, hasToStringTag = requireLib$d(), builtin = function() {
    if (hasRequiredMain$c) return main$c;
    hasRequiredMain$c = 1;
    var toStr = requireTostring$1();
    return main$c = function(v) {
      return toStr.call(v);
    };
  }(), polyfill = requirePolyfill$1();
  return main = hasToStringTag() ? polyfill : builtin, lib$a = main;
}

function requireLib$9() {
  if (hasRequiredLib$9) return lib$9;
  hasRequiredLib$9 = 1;
  var main = function() {
    if (hasRequiredMain$9) return main$9;
    hasRequiredMain$9 = 1;
    var Bool = Boolean;
    return main$9 = Bool;
  }();
  return lib$9 = main;
}

function requireTry2serialize() {
  if (hasRequiredTry2serialize) return try2serialize;
  hasRequiredTry2serialize = 1;
  var toString = function() {
    if (hasRequiredTostring) return tostring;
    hasRequiredTostring = 1;
    var toString = Boolean.prototype.toString;
    return tostring = toString;
  }();
  return try2serialize = function(value) {
    try {
      return toString.call(value), !0;
    } catch (err) {
      return !1;
    }
  };
}

function requireObject() {
  if (hasRequiredObject) return object;
  hasRequiredObject = 1;
  var hasToStringTag = requireLib$d(), nativeClass = requireLib$a(), Boolean = requireLib$9(), test = requireTry2serialize(), FLG = hasToStringTag();
  return object = function(value) {
    return "object" == typeof value && (value instanceof Boolean || (FLG ? test(value) : "[object Boolean]" === nativeClass(value)));
  };
}

function requireMain$7() {
  if (hasRequiredMain$7) return main$7;
  hasRequiredMain$7 = 1;
  var isBoolean = function() {
    if (hasRequiredLib$8) return lib$8;
    hasRequiredLib$8 = 1;
    var setReadOnly = requireLib$f(), main = function() {
      if (hasRequiredMain$8) return main$8;
      hasRequiredMain$8 = 1;
      var isPrimitive = requirePrimitive(), isObject = requireObject();
      return main$8 = function(value) {
        return isPrimitive(value) || isObject(value);
      };
    }(), isPrimitive = requirePrimitive(), isObject = requireObject();
    return setReadOnly(main, "isPrimitive", isPrimitive), setReadOnly(main, "isObject", isObject), 
    lib$8 = main;
  }().isPrimitive, format = requireLib$h(), getThis = hasRequiredCodegen ? codegen : (hasRequiredCodegen = 1, 
  codegen = function() {
    return new Function("return this;")();
  }), Self = function() {
    if (hasRequiredSelf) return self_1;
    hasRequiredSelf = 1;
    var obj = "object" == typeof self ? self : null;
    return self_1 = obj;
  }(), Win = function() {
    if (hasRequiredWindow) return window_1;
    hasRequiredWindow = 1;
    var obj = "object" == typeof window ? window : null;
    return window_1 = obj;
  }(), Global = hasRequiredGlobal ? global$1 : (hasRequiredGlobal = 1, global$1 = "object" == typeof commonjsGlobal ? commonjsGlobal : null), GlobalThis = function() {
    if (hasRequiredGlobal_this) return global_this;
    hasRequiredGlobal_this = 1;
    var obj = "object" == typeof globalThis ? globalThis : null;
    return global_this = obj;
  }();
  return main$7 = function(codegen) {
    if (arguments.length) {
      if (!isBoolean(codegen)) throw new TypeError(format("invalid argument. Must provide a boolean. Value: `%s`.", codegen));
      if (codegen) return getThis();
    }
    if (GlobalThis) return GlobalThis;
    if (Self) return Self;
    if (Win) return Win;
    if (Global) return Global;
    throw new Error("unexpected error. Unable to resolve global object.");
  }, main$7;
}

function requireCheck() {
  if (hasRequiredCheck) return check_1;
  hasRequiredCheck = 1;
  var RE = hasRequiredRe ? re : (hasRequiredRe = 1, re = /./), nodeList = function() {
    if (hasRequiredNodelist) return nodelist;
    hasRequiredNodelist = 1;
    var getGlobal = function() {
      if (hasRequiredLib$7) return lib$7;
      hasRequiredLib$7 = 1;
      var main = requireMain$7();
      return lib$7 = main;
    }(), root = getGlobal(), nodeList = root.document && root.document.childNodes;
    return nodelist = nodeList;
  }(), typedarray = function() {
    if (hasRequiredTypedarray) return typedarray_1;
    hasRequiredTypedarray = 1;
    var typedarray = Int8Array;
    return typedarray_1 = typedarray;
  }();
  return check_1 = function() {
    return "function" == typeof RE || "object" == typeof typedarray || "function" == typeof nodeList;
  };
}

function requireMain$6() {
  return hasRequiredMain$6 ? main$6 : (hasRequiredMain$6 = 1, main$6 = function() {
    return /^\s*function\s*([^(]*)/i;
  });
}

function requireLib$4() {
  if (hasRequiredLib$4) return lib$4;
  hasRequiredLib$4 = 1;
  var main = function() {
    if (hasRequiredMain$4) return main$4;
    hasRequiredMain$4 = 1;
    var isArray = function() {
      if (hasRequiredLib$5) return lib$5;
      hasRequiredLib$5 = 1;
      var main = function() {
        if (hasRequiredMain$5) return main$5;
        hasRequiredMain$5 = 1;
        var f, nativeClass = requireLib$a();
        return f = Array.isArray ? Array.isArray : function(value) {
          return "[object Array]" === nativeClass(value);
        }, main$5 = f;
      }();
      return lib$5 = main;
    }(), format = requireLib$h();
    return main$4 = function(predicate) {
      if ("function" != typeof predicate) throw new TypeError(format("invalid argument. Must provide a function. Value: `%s`.", predicate));
      return function(value) {
        var len, i;
        if (!isArray(value)) return !1;
        if (0 === (len = value.length)) return !1;
        for (i = 0; i < len; i++) if (!1 === predicate(value[i])) return !1;
        return !0;
      };
    };
  }();
  return lib$4 = main;
}

function requireLib$2() {
  if (hasRequiredLib$2) return lib$2;
  hasRequiredLib$2 = 1;
  var main = function() {
    if (hasRequiredMain$2) return main$2;
    hasRequiredMain$2 = 1;
    var isObjectLike = function() {
      if (hasRequiredLib$3) return lib$3;
      hasRequiredLib$3 = 1;
      var setReadOnly = requireLib$f(), arrayfun = requireLib$4(), main = hasRequiredMain$3 ? main$3 : (hasRequiredMain$3 = 1, 
      main$3 = function(value) {
        return null !== value && "object" == typeof value;
      });
      return setReadOnly(main, "isObjectLikeArray", arrayfun(main)), lib$3 = main;
    }();
    return main$2 = function(value) {
      return isObjectLike(value) && (value._isBuffer || value.constructor && "function" == typeof value.constructor.isBuffer && value.constructor.isBuffer(value));
    };
  }();
  return lib$2 = main;
}

function requireLib$1() {
  if (hasRequiredLib$1) return lib$1;
  hasRequiredLib$1 = 1;
  var main = function() {
    if (hasRequiredMain$1) return main$1;
    hasRequiredMain$1 = 1;
    var nativeClass = requireLib$a(), RE = function() {
      if (hasRequiredLib$6) return lib$6;
      hasRequiredLib$6 = 1;
      var setReadOnly = requireLib$f(), main = requireMain$6();
      return setReadOnly(main, "REGEXP", function() {
        if (hasRequiredRegexp) return regexp;
        hasRequiredRegexp = 1;
        var RE_FUNCTION_NAME = requireMain$6()();
        return regexp = RE_FUNCTION_NAME;
      }()), lib$6 = main;
    }().REGEXP, isBuffer = requireLib$2();
    return main$1 = function(v) {
      var match, name, ctor;
      if (("Object" === (name = nativeClass(v).slice(8, -1)) || "Error" === name) && v.constructor) {
        if ("string" == typeof (ctor = v.constructor).name) return ctor.name;
        if (match = RE.exec(ctor.toString())) return match[1];
      }
      return isBuffer(v) ? "Buffer" : name;
    };
  }();
  return lib$1 = main;
}

function requireMain() {
  if (hasRequiredMain) return main;
  hasRequiredMain = 1;
  var ctorName = requireLib$1();
  return main = function(v) {
    var type;
    return null === v ? "null" : "object" == (type = typeof v) ? ctorName(v).toLowerCase() : type;
  }, main;
}

function requirePolyfill() {
  if (hasRequiredPolyfill) return polyfill;
  hasRequiredPolyfill = 1;
  var ctorName = requireLib$1();
  return polyfill = function(v) {
    return ctorName(v).toLowerCase();
  };
}

var libExports = function() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  var usePolyfill = requireCheck(), builtin = requireMain(), polyfill = requirePolyfill(), main = usePolyfill() ? polyfill : builtin;
  return lib = main;
}(), type = getDefaultExportFromCjs(libExports);

export { type as default };
