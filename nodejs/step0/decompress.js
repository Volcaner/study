// 解压

var fs = require('fs');
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input_de.txt
fs.createReadStream('input.txt.gz')
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream('input_de.txt'));

console.log('program gunzip is successed!');
