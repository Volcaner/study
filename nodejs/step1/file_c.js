// ��ȡ�ļ�

const fs = require('fs');
let buf = new Buffer(1024*64);

console.log('Ready to open file!');
fs.open('input.txt', 'r+', (err, fd) => {
	if(err) return console.log('Open file failed');

	console.log('Open file successful!', fd);
	

	// ��ȡ����
	console.log('cut after 10 bytes to the end!');
	fs.ftruncate(fd, 10, err => {
		if(err) return console.log('Cut file failed!');

		console.log('Cut file successful!');

		// ��ȡ�ļ�
		console.log('Read the same file!');
		fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
			if(err) return console.log('Read file failed!');

			// �������ȡ���ֽ�
			if(bytes > 0) {
				console.log(buf.slice(0, bytes).toString());
			}

			// �ر��ļ�
			fs.close(fd, err => {
				if(err) return console.log('Close file failed!');

				console.log('Close file successful!');
			})

		})
	})
});
