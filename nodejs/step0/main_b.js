// require events model
var events = require("events");

// create eventEmitter object
var eventEmitter = new events.EventEmitter();

// create event handler
var connectHandler = function connected() {
	console.log("connect success!");

	// emit data_received event
	eventEmitter.emit('data_received');
};

// bind connection event handler
eventEmitter.on('connection', connectHandler);

// use anonymousFunc bind data_received event
eventEmitter.on('data_received', function() {
	console.log('received data success!');
});

// emit connection event
eventEmitter.emit('connection');

console.log('the program executed success!');
