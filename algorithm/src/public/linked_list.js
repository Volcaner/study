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
		if(originalTail.prev) {
			originalTail.prev.next = null;
		}
		else {
			this.head = null;
		}
		return originalTail.value;
	}

	remove(after) {
		const prevNode = this._findNode(after);
		if(!prevNode) return;
		if(prevNode.next) {
			const nextNode = prevNode.next.next;
			if(!nextNode) this.tail = prevNode;
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

	toString() {
		if(!this.head) return '';
		let cur = this.head;
		let str = cur.value.toString();
		while(cur.next) {
			cur = cur.next;
			str += cur.value.toString();
		}
		return str;
	}
}

module.exports = LinkedList;