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

// function queue_test() {
// 	const queue = new Queue();
// 	queue.push(1);
// 	queue.push(2);
// 	queue.push(3);

// 	console.log(queue.shift());
// 	console.log(queue.shift());
// 	console.log(queue.shift());
// }
// queue_test();

function queue_test() {
	let a = [0, 87, 1, 7, 98, 19, 19, 77, 55, 75, 12, 10, 100, 1000, 79, 234, 543, 43, 5, 23, 543, 43, 12, 7, 43, 654, 62, 62, 46, 2643, 87];

	const queues = [];
	for(var i = 0; i < 10; i++) {
		queues.push(new Queue());
	}

	for(var i = 0; i < 4; i++) {
		for(const n of a) {
			const index = Math.floor(n/Math.pow(10, i) % 10);
			queues[index].push(n);
		}

		const r = [];
		for(const q of queues) {
			let n = q.shift();
			while(!isNaN(parseFloat(n))) {
				r.push(n);
				n = q.shift();
			}
		}

		a = r;
	}

	console.log(a);
}

let startTime = 0, endTime = 0;
startTime = new Date().getTime();

queue_test();

endTime = new Date().getTime();
console.log(endTime - startTime);



