import Queue from "../public/queue_by_array.js";

function Patient(name, code) {
	this.name = name;
	this.code = code;
};
function dequeue() {
	var entry = 0;
	for(var i = 1; i < this.dataStore.length; i++) {
		if(this.dataStore[i].code < this.dataStore[entry].code) {
			entry = i;
		}
	}

	return this.dataStore.splice(entry, 1);
};
function toString() {
	var retStr = "";
	for(var i = 0; i < this.dataStore.length; i++) {
		retStr += this.dataStore[i].name + " Code: " + this.dataStore[i].code + "\n";
	}

	return retStr;
};

var p = new Patient("Smith", 5);
var ed = new Queue();
ed.dequeue = dequeue;
ed.toString = toString;
ed.enqueue(p);

p = new Patient("Jones", 4);
ed.enqueue(p);

p = new Patient("Fehrenbach", 6);
ed.enqueue(p);

p = new Patient("Brown", 1);
ed.enqueue(p);

p = new Patient("Ingram", 1);
ed.enqueue(p);

console.log(ed.toString());
console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());

console.log(ed.dequeue());
console.log(ed.toString());