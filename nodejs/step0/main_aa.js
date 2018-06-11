var events = require('events');
var eventEmitter = new events.EventEmitter();

// listener1
var listener1 = function() {
	console.log('listenner1 execute!');
};

// listener2
var listener2 = function() {
	console.log('listener2 execute!');
};

// bind connection, fn => listener1
eventEmitter.on('connection', listener1);

// bind connection, fn => listener2
eventEmitter.on('connection', listener2);

var eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + ' ge listener listen events');

// emit connection
eventEmitter.emit('connection');

// removeListener
eventEmitter.removeListener('connection', listener1);
console.log('listener1 do not listen');

// emit connection
eventEmitter.emit('connection');

eventListeners = events.EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListeners + ' ge listener listen events');

console.log('pragram has been done!');
