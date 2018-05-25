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

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 插入排序法
var insertionSort = function insertionSort(arr) {
	var len = arr.length;
	for (var i = 1; i < len; i++) {
		var temp = arr[i];
		var j = i;
		while (j > 0 && arr[j - 1] >= temp) {
			arr[j] = arr[j - 1];
			j--;
		}
		arr[j] = temp;
	}

	return arr;
};

// var arr = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24];
// console.log(arr);
// insertionSort(arr);
// console.log(arr);

// 冒泡排序法
var bubbleSort = function bubbleSort(arr) {
	var len = arr.length;
	for (var i = len - 1; i >= 0; i--) {
		for (var j = 0; j < i; j++) {
			if (arr[j] > arr[i]) {
				var temp = arr[j];
				arr[j] = arr[i];
				arr[i] = temp;
			}
		}
	}

	return arr;
};

// var arr = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24, -1, 0];
// console.log(arr);
// bubbleSort(arr);
// console.log(arr);

// 选择排序法
var selectionSort = function selectionSort(arr) {
	var len = arr.length;
	var min;
	for (var i = 0; i < len - 1; i++) {
		min = arr[i];
		for (var j = i + 1; j < len; j++) {
			if (arr[j] < min) {
				var temp = min;
				min = arr[j];
				arr[j] = temp;
			}
		}
		arr[i] = min;
	}

	return arr;
};

// var arr = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24, -1, 0];
// console.log(arr);
// selectionSort(arr);
// console.log(arr);

/***/ })

/******/ });