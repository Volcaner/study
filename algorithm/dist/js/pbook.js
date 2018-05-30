/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 100);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.6' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(5)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(17);
var toPrimitive = __webpack_require__(14);
var dP = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(9);
var has = __webpack_require__(6);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(4);
var createDesc = __webpack_require__(11);
module.exports = __webpack_require__(1) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(21);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(5)(function () {
  return Object.defineProperty(__webpack_require__(16)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(72);
var defined = __webpack_require__(29);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(47);
var enumBugKeys = __webpack_require__(30);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(36)('keys');
var uid = __webpack_require__(27);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(26) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(68)(false);
var IE_PROTO = __webpack_require__(35)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 48 */,
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(83);
var toAbsoluteIndex = __webpack_require__(82);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(8);
var core = __webpack_require__(0);
var fails = __webpack_require__(5);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 80 */,
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(37);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(106);

var _keys2 = _interopRequireDefault(_keys);

var _dictionary_by_array = __webpack_require__(104);

var _dictionary_by_array2 = _interopRequireDefault(_dictionary_by_array);

var _public = __webpack_require__(105);

var _public2 = _interopRequireDefault(_public);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pBook = new _dictionary_by_array2.default();
function showAll() {
	var dataKeys = _public2.default.toArray((0, _keys2.default)(this.dataStore));
	for (var key in dataKeys.sort()) {
		console.log(dataKeys[key] + " -> " + this.dataStore[dataKeys[key]]);
	}
};
pBook.showAll = showAll;

pBook.add("Mike", "123");
pBook.add("David", "345");
pBook.add("Cynthia", "456");
pBook.add("Jimy", "34567");
pBook.add("Tom", "289");
pBook.add("Aiby", "980");
pBook.add("Tim", "456");

console.log("David\'s extension: " + pBook.find("David"));
pBook.remove("David");
pBook.showAll();
console.log(pBook.count());
pBook.clear();
pBook.showAll();

/***/ }),
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(106);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Public = __webpack_require__(105);

function Dictionary() {
	// 字典
	this.dataStore = new Array();
	this.add = add;
	this.find = find;
	this.remove = remove;
	this.showAll = showAll;
	this.count = count;
	this.clear = clear;
};
function add(key, value) {
	this.dataStore[key] = value;
};
function find(key) {
	return this.dataStore[key];
};
function remove(key) {
	delete this.dataStore[key];
};
function showAll() {
	var dataKeys = Public.toArray((0, _keys2.default)(this.dataStore));
	for (var key in dataKeys) {
		console.log(dataKeys[key] + " -> " + this.dataStore[dataKeys[key]]);
	}
};
function count() {
	var n = 0;
	var dataKeys = Public.toArray((0, _keys2.default)(this.dataStore));
	for (var key in dataKeys) {
		n++;
	}

	return n;
};
function clear() {
	var dataKeys = Public.toArray((0, _keys2.default)(this.dataStore));
	for (var key in dataKeys) {
		delete this.dataStore[dataKeys[key]];
	}
};

module.exports = Dictionary;

// var pBook = new Dictionary();
// pBook.add("Mike", "123");
// pBook.add("David", "345");
// pBook.add("Cynthia", "456");
// console.log("David\'s extension: " + pBook.find("David"));
// pBook.remove("David");
// pBook.showAll();

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 获取地址参数
var getHrefParam = function getHrefParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    };
};

// 判断字符串非空
var isNorU = function isNorU(str) {
    if (str == undefined || str == null || str == "") {
        return true;
    } else {
        return false;
    }
};

// 日期
var getDate = function getDate(format, timestamp) {
    /** 
    * 和PHP一样的时间戳格式化函数 
    * @param {string} format 格式 
    * @param {int} timestamp 要格式化的时间 默认为当前时间 
    * @return {string}   格式化的时间字符串 
    */
    var a,
        jsdate = timestamp ? new Date(timestamp * 1000) : new Date();
    var pad = function pad(n, c) {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var txt_ordin = {
        1: "st",
        2: "nd",
        3: "rd",
        21: "st",
        22: "nd",
        23: "rd",
        31: "st"
    };
    var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var f = {
        // Day 
        d: function d() {
            return pad(f.j(), 2);
        },
        D: function D() {
            return f.l().substr(0, 3);
        },
        j: function j() {
            return jsdate.getDate();
        },
        l: function l() {
            return txt_weekdays[f.w()];
        },
        N: function N() {
            return f.w() + 1;
        },
        S: function S() {
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th';
        },
        w: function w() {
            return jsdate.getDay();
        },
        z: function z() {
            return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0;
        },

        // Week 
        W: function W() {
            var a = f.z(),
                b = 364 + f.L() - a;
            var nd2,
                nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= 6 - nd) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return 1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7) >> 0;
                }
            }
        },

        // Month 
        F: function F() {
            return txt_months[f.n()];
        },
        m: function m() {
            return pad(f.n(), 2);
        },
        M: function M() {
            return f.F().substr(0, 3);
        },
        n: function n() {
            return jsdate.getMonth() + 1;
        },
        t: function t() {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if (n & 1 && n < 8 || !(n & 1) && n > 7) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },

        // Year 
        L: function L() {
            var y = f.Y();
            return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0;
        },
        //o not supported yet 
        Y: function Y() {
            return jsdate.getFullYear();
        },
        y: function y() {
            return (jsdate.getFullYear() + "").slice(2);
        },

        // Time 
        a: function a() {
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: function A() {
            return f.a().toUpperCase();
        },
        B: function B() {
            // peter paul koch: 
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds = jsdate.getHours() * 3600 + jsdate.getMinutes() * 60 + jsdate.getSeconds() + off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if (String(beat).length == 1) beat = "00" + beat;
            if (String(beat).length == 2) beat = "0" + beat;
            return beat;
        },
        g: function g() {
            return jsdate.getHours() % 12 || 12;
        },
        G: function G() {
            return jsdate.getHours();
        },
        h: function h() {
            return pad(f.g(), 2);
        },
        H: function H() {
            return pad(jsdate.getHours(), 2);
        },
        i: function i() {
            return pad(jsdate.getMinutes(), 2);
        },
        s: function s() {
            return pad(jsdate.getSeconds(), 2);
        },
        //u not supported yet 
        // Timezone 
        //e not supported yet 
        //I not supported yet 
        O: function O() {
            var t = pad(Math.abs(jsdate.getTimezoneOffset() / 60 * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t;else t = "+" + t;
            return t;
        },
        P: function P() {
            var O = f.O();
            return O.substr(0, 3) + ":" + O.substr(3, 2);
        },
        //T not supported yet 
        //Z not supported yet 
        // Full Date/Time 
        c: function c() {
            return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P();
        },
        //r not supported yet 
        U: function U() {
            return Math.round(jsdate.getTime() / 1000);
        }
    };

    var forReg = /([\])?([a-zA-Z])/g;
    return format.replace(forReg, function (t, s) {
        if (t != s) {
            // escaped 
            ret = s;
        } else if (f[s]) {
            // a date function exists 
            ret = f[s]();
        } else {
            // nothing special 
            ret = s;
        }
        return ret;
    });
};

// scroll
var htmlScrollOk = function htmlScrollOk() {
    var htmlTop = parseFloat($('html').css("top"));
    $('html').css({ overflow: "auto", position: "absolute", top: "0px" });
    $('body').scrollTop(Math.abs(htmlTop));
};
var htmlScrollPok = function htmlScrollPok() {
    var scrollTop = document.body.scrollTop;
    $('html').css({ overflow: "hidden", position: "fixed", top: -scrollTop + "px" });
};

// 对象及其一级子元素判空
var bIsObjUorN = function bIsObjUorN(obj) {
    if (obj) {
        var k = 0;
        for (var key in obj) {
            k++;
            if (_isNorU(obj[key])) {
                // 对象子元素判空
                return false;
            }
        }
        if (k <= 0) {
            // 对象判空
            return false;
        }
    } else {
        return false;
    }

    return true;
};

// uuid
var uuid = function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
            }
        }
    }

    return uuid.join('');
};

// toArray
var toArray = function toArray(s) {
    // Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）
    try {
        return Array.prototype.slice.call(s);
    } catch (e) {
        var arr = [];
        for (var i = 0, len = s.length; i < len; i++) {
            // arr.push(s[i]);
            arr[i] = s[i]; // 据说这样比push快
        }
        return arr;
    }
};

module.exports = {
    toArray: toArray,
    getHrefParam: getHrefParam,
    isNorU: isNorU,
    getDate: getDate,
    htmlScrollOk: htmlScrollOk,
    htmlScrollPok: htmlScrollPok,
    bIsObjUorN: bIsObjUorN,
    uuid: uuid
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(107), __esModule: true };

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(108);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(49);
var $keys = __webpack_require__(32);

__webpack_require__(79)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ })
/******/ ]);