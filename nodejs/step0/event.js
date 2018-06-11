var EventEmitter = require("events").EventEmitter;
var event = new EventEmitter();

// bind event
event.on('some_event', function() {
	console.log('some_event is emitting!');
});

// emit event
console.log(new Date());
setTimeout(function() {
	console.log(new Date());
	event.emit('some_event');
}, 1000);
