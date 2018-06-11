var http = require('http');

http.createServer(function(request, response) {
	// send HTTP header
	// HTTP status: 200 : OK
	// content-type: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// send response data "Hello World!"
	response.end('Hello World!');
}).listen(8888);

// console.log
console.log('Server running at http://localhost:8888');
