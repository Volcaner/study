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
/******/ 	return __webpack_require__(__webpack_require__.s = 99);
/******/ })
/************************************************************************/
/******/ ({

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Queue() {
	// 实现队列
	this.dataStore = [];
	this.count = count;
	this.enqueue = enqueue;
	this.dequeue = dequeue;
	this.front = front;
	this.back = back;
	this.toString = toString;
	this.empty = empty;
};
function count() {
	return this.dataStore.length;
};
function enqueue(element) {
	this.dataStore.push(element);
};
function dequeue() {
	return this.dataStore.shift();
};
function front() {
	return this.dataStore[0];
};
function back() {
	return this.dataStore[this.dataStore.length - 1];
};
function toString() {
	var retStr = "";
	for (var i = 0; i < this.dataStore.length; i++) {
		retStr += this.dataStore[i] + "\n";
	}
	return retStr;
};
function empty() {
	if (this.dataStore.length == 0) {
		return true;
	} else {
		return false;
	}
};

module.exports = Queue;

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _queue_by_array = __webpack_require__(24);

var _queue_by_array2 = _interopRequireDefault(_queue_by_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Patient(name, code) {
	this.name = name;
	this.code = code;
};
function dequeue() {
	var entry = 0;
	for (var i = 1; i < this.dataStore.length; i++) {
		if (this.dataStore[i].code < this.dataStore[entry].code) {
			entry = i;
		}
	}

	return this.dataStore.splice(entry, 1);
};
function toString() {
	var retStr = "";
	for (var i = 0; i < this.dataStore.length; i++) {
		retStr += this.dataStore[i].name + " Code: " + this.dataStore[i].code + "\n";
	}

	return retStr;
};

var p = new Patient("Smith", 5);
var ed = new _queue_by_array2.default();
ed.dequeue = dequeue;
ed.toString = toString;
ed.enqueue(p);

p = new Patient("Jones", 4);
ed.enqueue(p);

p = new Patient("Fehrenbach", 6);
ed.enqueue(p);

p = new Patient("Brown", 1);
ed.enqueue(p);

p = new Patient("Ingram", 1);
ed.enqueue(p);

console.log(ed.toString());
console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

/***/ })

/******/ });