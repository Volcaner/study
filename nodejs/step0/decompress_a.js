// 管道流：向 output.txt 中添加内容，并保留原内容

let fs = require('fs');
let data = '';
let data2 = '你的小青蛙是真的好可爱！';

// 1.读取流
// 创建可读流
let readerStream = fs.createReadStream('input.txt');
// 设置 utf-8 编码
readerStream.setEncoding('UTF8');
// 处理流事件
readerStream.on('data', chunk => data += chunk);
readerStream.on('end', () => writeS(data));
readerStream.on('error', err => console.log(err.stack));
console.log('program1 is finished!');

// 2.写入流
// 创建可读流
let writeS = dataS => {
	let writerStream = fs.createWriteStream('output2.txt');
	// 使用 utf-8 写入流
	writerStream.write(data2+dataS, 'UTF8');
	// 标记文件末尾
	writerStream.end();
	// 处理事件流
	writerStream.on('finish', () => console.log('writed successfully!'));
	writerStream.on('error', err => console.log(err.stack));
	console.log('program2 is finished!');
}
