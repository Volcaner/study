// �첽���ļ�

const fs = require('fs');

console.log('ready to open file!');
fs.open('input.txt', 'r+', (err, fd) => {
	if(err) return console.log(err);

	console.log('opened successfully!');
});

console.log('******************************************************************************');


// �첽 ��ȡ�ļ���Ϣ
fs.stat('input.txt', (err, stats) => {
	console.log(stats);

	console.log(stats.isFile()); 
});

console.log('******************************************************************************');

// �첽д���ļ�
console.log('ready to write data into file');
fs.writeFile('input.txt', '����ͨ�� fs.writeFile д���ļ�������', err => {
	if(err) return console.log(err);
		
	console.log('write OK!');
	console.log('-----------------------------cutline-------------------------------');
	console.log('read file');
	fs.readFile('input.txt', (err, data) => {
		if(err) return console.log(err);

		console.log('async read file: ' + data.toString());	
	})
});

console.log('******************************************************************************');

// �첽��ȡ�ļ�
let buf = new Buffer(1024);

console.log('ready to open exited file');
fs.open('input.txt', 'r+', (err, fd) => {
	if(err) return console.log(err);

	console.log('file open successful!');
	console.log('ready to read file');
	fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
		if(err) console.log(err);

		console.log(bytes + ' bytes are readed!');

		// �������ȡ���ֽ�
		if(bytes > 0) console.log(buf.slice(0, bytes).toString());
	});
});
