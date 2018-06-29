// 获取 POST 请求内容

const http = require('http');
const querystring = require('querystring');

var strHtml = `
	<html>
		<head>
			<meta charset='utf-8'>
			<title>Node.js POST 实例</title>
		</head>
		<body>
			<form method='post'>
				<label>网站名：<input name="name"></label>
				<label>网站URL：<input name="url"></label>
				<input type="submit">
			</form>
		</body>
	</html>			
`;


http.createServer(function(req, res) {
	var post = '';
	req.on('data', chunk => {
		post += chunk;
	})
	req.on('end', () => {
		// 解析参数
		post = querystring.parse(post);

		console.log(post);

		// 设置响应头部信息及编码
		res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

		if(post.name && post.url) {  // 输出提交的内容
			res.write('网站名：' + post.name);
			res.write('\n');
			res.write('网站URL：' + post.url);
		}
		else {
			res.write(strHtml);
		}

		res.end();
	});
}).listen(3000);

console.log('Server is started!');
