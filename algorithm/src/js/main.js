class Node {
	constructor(value, next, prev) {
		this.value = value;
		this.next = next || null;
		this.prev = prev || null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	insert(value, after) {
		const nodeToInsert = new Node(value);
		if(!this.head) {
			this.head = nodeToInsert;
			this.tail = nodeToInsert;
			return;
		}
		const node = this._findNode(after);
		if(!node) return;
		const originalNext = node.next;
		node.next = nodeToInsert;
		nodeToInsert.prev = node;
		if(originalNext) {
			nodeToInsert.next = originalNext;
			originalNext.prev = nodeToInsert;
		}
		else this.tail = nodeToInsert;
	}

	push(value) {
		const nodeToInsert = new Node(value, null);
		if(!this.tail) {
			this.head = nodeToInsert;
			this.tail = nodeToInsert;
		}
		else {
			this.tail.next = nodeToInsert;
			nodeToInsert.prev = this.tail;
			this.tail = nodeToInsert;
		}
	}

	pop() {
		if(!this.tail) return null;
		const originalTail = this.tail;
		this.tail = originalTail.prev;
		originalTail.prev.next = null;
		return originalTail.value;
	}

	remove(after) {
		const prevNode = this._findNode(after);
		if(!prevNode) return;
		if(prevNode.next) {
			const nextNode = prevNode.next.next;
			if(!nextNode) this.tail = prevNode; return;
			prevNode.next.next = null;
			prevNode.next = nextNode;
		}
	}

	_findNode(value) {
		if(!this.head) return null;
		if(this.head.value === value) return this.head;
		let cur = this.head;
		while(cur.next) {
			cur = cur.next;
			if(cur.value === value) return cur;
		}
		return null;
	}
}

function linkedListTests() {
	let startTime = 0, endTime = 0;


	// Array
	const arr = new Array(1000000);
	for (var i = 0; i < 1000000; i++) {
		arr[i] = i;
	}

	startTime = new Date().getTime();

	for (var i = 0; i < 10; i++) {
		arr.shift();
	}

	endTime = new Date().getTime();
	console.log(endTime - startTime);




	// linkedList
	const linkedList = new linkedList();


	startTime = new Date().getTime();

	for (var i = 0; i < 100; i++) {
		arr.shift();
	}

	endTime = new Date().getTime();
	console.log(endTime - startTime);
}

linkedListTests();
