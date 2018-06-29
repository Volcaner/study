// classical path

// var fs = require('fs');
// var data = '';

// var readerStream = fs.createReadStream('input.txt');

// var writerStream = fs.createWriteStream('output_f.txt');

// readerStream.pipe(writerStream);

// reader.on('data', function(chunk) {
// 	data += chunk;
// });

// reader.on('error', function(err) {
// 	console.log(err.stack);
// });

// reader.on('end', function() {
// 	console.log(data);
// });





// ES6 path

let fs = require('fs');
let data = '';
let data2 = 'You are a little frog!';  // 你是一只小青蛙！

let readStream = fs.createReadStream('input.txt');
readStream.setEncoding('UTF8');
readStream.on('data', chunk => data += chunk);
readStream.on('error', err => console.log(err.stack));
readStream.on('end', () => writeS(data));

let writeS = dataS => {
	let writeStream = fs.createWriteStream('output_g.js');
	writeStream.write(dataS + data2, 'UTF8');

	writeStream.end();

	writeStream.on('finish', () => console.log('writed! and input cat *** to show the output txt.'));
	writeStream.on('error', err => console.log(err.stack));

	console.log('the write stream pipe is finished!');
};

console.log('The program is finished!');
