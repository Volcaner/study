// 插入排序法
var insertionSort = function(arr) {
	var len = arr.length;
	for(var i = 1; i < len; i++) {
		var temp = arr[i];
		var j = i;
		while(j > 0 && (arr[j - 1] >= temp)) {
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
var bubbleSort = function(arr) {
	var len = arr.length;
	for(var i = len - 1; i >= 0; i--) {
		for(var j = 0; j < i; j++) {
			if(arr[j] > arr[i]) {
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
var selectionSort = function(arr) {
	var len = arr.length;
	var min;
	for(var i = 0; i < len-1; i++) {
		min = arr[i];
		for(var j = i + 1; j < len; j++) {
			if(arr[j] < min) {
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







