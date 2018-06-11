// 可能存在覆盖状态， 可以设置追加参数来解决

var fs = require('fs');
var read = fs.createReadStream('input.txt');

var write = fs.createWriteStream('output3.txt', {'flags' : 'a'});

// 管道流读写操作
read.pipe(write);

console.log('finished!');
