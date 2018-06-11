// 管道流

var fs = require('fs');

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output2.txt');

// 管道读写操作
// 读取 inpt.txt 文件内容，并将内容写入到 output.txt2 文件中
readerStream.pipe(writerStream);

console.log('program is finished!');
