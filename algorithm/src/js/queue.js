import LinkedList from '../public/linked_list.js';

class Queue extends LinkedList {
	constructor() {
		super();
	}

	shift() {
		if(!this.head) return null;
		const originalHead = this.head;
		this.head = originalHead.next;
		if(originalHead.next) {
			originalHead.next.prev = null;
		}
		else {
			this.tail = null;
		}
		return originalHead.value;
	}
}

function queue_test() {
	const queue = new Queue();
	queue.push(1);
	queue.push(2);
	queue.push(3);

	console.log(queue.shift());
	console.log(queue.shift());
	console.log(queue.shift());
}
queue_test();