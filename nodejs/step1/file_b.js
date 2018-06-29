// �ļ���ȡ

const fs = require('fs');
let buf = new Buffer(1024*64);

// buf.write('aaa');
// console.log(buf.length);

console.log('Ready to open file!');
fs.open('input.txt', 'r+', (err, fd) => {
	if(err) return console.log('Open file failed: ', err);

	console.log('Open file successful!');

	console.log('Ready to read file!');
	fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
		if(err) return console.log('Read file failed:', err);

		// �������ȡ���ֽ�
		if(bytes > 0) {
		       console.log(buf.slice(0, bytes).toString());
		}

		// �ر��ļ�
		fs.close(fd, err => {
			if(err) return console.log('Close file failed!', err);

			console.log('Close file successful!');
		});	
	})
})
