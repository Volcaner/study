// ��ѹ

var fs = require('fs');
var zlib = require('zlib');

// ��ѹ input.txt.gz �ļ�Ϊ input_de.txt
fs.createReadStream('input.txt.gz')
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream('input_de.txt'));

console.log('program gunzip is successed!');
