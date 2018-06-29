// http

var http = require('http');

var onRequest = function(request, response) {
	response.writeHead(200, {'content-Type': 'text/plain'});
	response.write('Hello World!');
	response.end();
};

http.createServer(onRequest).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
