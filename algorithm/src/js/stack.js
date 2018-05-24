const LinkedList = require('../public/linked_list');

class Stack {
	constructor() {
		return new LinkedList();
	}
}

function StackTest() {
	// const stack = new Stack();

	// stack.push(1);
	// stack.push(2);
	// stack.push(3);

	// console.log(stack.pop());
	// console.log(stack.pop());
	// console.log(stack.pop());
	

	const str = '{{{{{{{{{{}}}}}}}}}}';
	const stack = new Stack();
	for(var i = 0; i < str.length; i++) {
		const c = str[i];
		if(c === '{') stack.push(i);
		if(c === '}') stack.pop();
	}

	console.log(stack.toString());
}

StackTest();