// Ñ¹Ëõ

var fs = require('fs');
var zlib = require('zlib');

// Ñ¹Ëõ input.txt ÎÄ¼şÎª input.txt.gz
fs.createReadStream('input.txt')
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('input.txt.gz'));

console.log('file gzip is successed!');
