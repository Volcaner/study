var Public = require("../public/public.js");

function Dictionary() {  // 字典
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
	var dataKeys = Public.toArray(Object.keys(this.dataStore));
	for(var key in dataKeys) {
		console.log(dataKeys[key] + " -> " + this.dataStore[dataKeys[key]]);
	}
};
function count() {
	var n = 0;
	var dataKeys = Public.toArray(Object.keys(this.dataStore));
	for(var key in dataKeys) {
		n++;
	}

	return n;
};
function clear() {
	var dataKeys = Public.toArray(Object.keys(this.dataStore));
	for(var key in dataKeys) {
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