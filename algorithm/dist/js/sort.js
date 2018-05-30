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
/******/ 	return __webpack_require__(__webpack_require__.s = 102);
/******/ })
/************************************************************************/
/******/ ({

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _queue_by_array = __webpack_require__(24);

var _queue_by_array2 = _interopRequireDefault(_queue_by_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = 0,
    end = 0;

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


// 希尔排序（高级排序算法）
var hardCodingIntervalShellSort = function hardCodingIntervalShellSort(arr, gaps) {
	// 硬编码间隔
	var len = arr.length;
	for (var i = 0; i < gaps.length; i++) {
		for (var j = gaps[i]; j < len; j++) {
			var temp = arr[j];
			var k = j;
			while (k > 0 && arr[k - gaps[i]] >= temp) {
				arr[k] = arr[k - gaps[i]];
				k -= gaps[i];
			}
			arr[k] = temp;
		}
	}

	return arr;
};

var dynamicCalculationIntervalShellSort = function dynamicCalculationIntervalShellSort(arr) {
	// 动态计算间隔
	var len = arr.length;
	var h = 1;
	while (h < len / 3) {
		h = 3 * h + 1;
	}
	while (h >= 1) {
		for (var i = h; i < len; i++) {
			var temp = arr[i];
			var j = i;
			while (j > 0 && arr[j - h] >= temp) {
				arr[j] = arr[j - h];
				j -= h;
			}
			arr[j] = temp;
		}

		h = (h - 1) / 3;
	}

	return arr;
};

// var arr1 = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24, -1, 0];
// for(var a = 0; a < 100000; a++) {
// 	arr1.push(Math.random()*1000);
// }
// var gaps = [701, 301, 132, 57, 23, 10, 4, 1];
// start = new Date().getTime();

// hardCodingIntervalShellSort(arr1, gaps);
// // console.log(arr1);

// end = new Date().getTime();
// console.log(arr1);
// console.log("硬编码间隔希尔排序耗时：" + (end - start));


// var arr2 = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24, -1, 0];
// for(var a = 0; a < 100000; a++) {
// 	arr2.push(Math.random()*1000);
// }
// start = new Date().getTime();

// insertionSort(arr2);
// // console.log(arr2);

// end = new Date().getTime();
// console.log(arr2);
// console.log("插入排序耗时：" + (end - start));


// var arr3 = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24, -1, 0];
// for(var a = 0; a < 10000000; a++) {
// 	arr3.push(Math.random()*1000);
// }
// start = new Date().getTime();

// dynamicCalculationIntervalShellSort(arr3);
// // console.log(arr2);

// end = new Date().getTime();
// console.log(arr3);
// console.log("动态计算间隔希尔排序耗时：" + (end - start));


// 自底向上的归并排序
var mergeSort = function mergeSort(arr) {
	var len = arr.length;
	if (len < 2) {
		return arr;
	}

	var step = 1;
	var left, right;
	while (step < len) {
		left = 0;
		right = step;

		while (right + step <= len) {
			mergeArrays(arr, left, left + step, right, right + step);
			left = right + step;
			right = left + step;

			// console.log(arr);
		}

		if (right < arr.length) {
			mergeArrays(arr, left, left + step, right, arr.length);

			// console.log(arr);
		}
		step *= 2;
	}
};
var mergeArrays = function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
	var rightArr = new Array(stopRight - startRight + 1);
	var leftArr = new Array(stopLeft - startLeft + 1);
	var k = startRight;
	for (var i = 0; i < rightArr.length - 1; i++) {
		rightArr[i] = arr[k];
		k++;
	}

	var q = startLeft;
	for (var i = 0; i < leftArr.length - 1; i++) {
		leftArr[i] = arr[q];
		q++;
	}

	rightArr[rightArr.length - 1] = Infinity; // 哨兵值
	leftArr[leftArr.length - 1] = Infinity; // 哨兵值

	var m = 0;
	var n = 0;
	for (var j = startLeft; j < stopRight; j++) {
		if (leftArr[m] <= rightArr[n]) {
			arr[j] = leftArr[m];
			m++;
		} else {
			arr[j] = rightArr[n];
			n++;
		}
	}
};

// var nums = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24, -1, 0];
// for(var a = 0; a < 10000000; a++) {
// 	nums.push(Math.random()*1000);
// }

// start = new Date().getTime();

// mergeSort(nums);

// end = new Date().getTime();
// console.log("自底向上的归并排序：" + (end - start));
// console.log(nums);


// 快速排序
function qSort(arr) {
	var len = arr.length;
	if (len <= 0) return [];
	var lesser = [],
	    greater = [],
	    pivot = arr[0];
	for (var i = 1; i < len; i++) {
		if (arr[i] < pivot) {
			lesser.push(arr[i]);
		} else {
			greater.push(arr[i]);
		}
	}
	return qSort(lesser).concat(pivot, qSort(greater));
};

// var list = [659, 2, 4, 65, 231, 4, 63, 8, 34, 98, 54, 345, 89, 75, 24, -1, 0];
// for(var a = 0; a < 10000000; a++) {
// 	list.push(Math.random()*1000);
// }

// start = new Date().getTime();

// list = qSort(list);

// end = new Date().getTime();
// console.log("快速排序：" + (end - start));
// console.log(list);


// 基数排序
function distribute(nums, queues, n, digit) {
	// 参数digit表示 个位 或 十位 上的值(只适用于个位数和十位数)
	for (var i = 0; i < n; i++) {
		if (digit == 1) {
			queues[nums[i] % 10].enqueue(nums[i]);
		} else {
			queues[Math.floor(nums[i] / 10)].enqueue(nums[i]);
		}
	}
};
function collect(queues, nums) {
	var i = 0;
	for (var digit = 0; digit < 10; digit++) {
		while (!queues[digit].empty()) {
			nums[i++] = queues[digit].dequeue();
		}
	}
};

var queues = [];
for (var i = 0; i < 10; i++) {
	queues[i] = new _queue_by_array2.default();
}
var nums = [];
for (var i = 0; i < 10; i++) {
	nums[i] = Math.floor(Math.floor(Math.random() * 100));
}

// console.log(nums);
// distribute(nums, queues, 10, 1);
// collect(queues, nums);
// console.log(nums);
// distribute(nums, queues, 10, 2);
// collect(queues, nums);
// console.log(nums);

/***/ }),

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

/***/ })

/******/ });