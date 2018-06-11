var events = require('events')
var emitter = new events.EventEmitter()

// try{
	emitter.emit('error')
	console.log('hahaha')
// } catch(error) {
// 	console.log(error)
// }
