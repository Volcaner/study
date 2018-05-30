function Queue() {  // 实现队列
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
	for(var i = 0; i < this.dataStore.length; i++) {
		retStr += this.dataStore[i] + "\n";
	}
	return retStr;
};
function empty() {
	if(this.dataStore.length == 0) {
		return true;
	}
	else {
		return false;
	}
};

module.exports = Queue;