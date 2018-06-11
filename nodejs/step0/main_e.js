// 写入流

var fs = require('fs');
var data = 'www.rynoob.com';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf-8 编码写入数据
writerStream.write(data, 'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, error
writerStream.on('finish', function() {
	console.log('write success!');
});

writerStream.on('error',function(err) {
	console.log(err.stack);
});

// cat output.txt

console.log('program is finished!');
