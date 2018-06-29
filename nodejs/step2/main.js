// 获取 GET 请求内容

const http = require('http');
const url = require('url');
const util = require('util');

http.createServer((req, res) => {
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	
	// 解析 URL 参数
	var params = url.parse(req.url, true).query;
	res.write('网站名：' + params.name);
	res.write('\n');
	res.write('网站URL：' + params.url);
	res.end();

	// res.end(util.inspect(url.parse(req.url, true)));
}).listen(3000);

console.log('Server is started!');
