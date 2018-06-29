// 截取文件

const fs = require('fs');
let buf = new Buffer(1024*64);

console.log('Ready to open file!');
fs.open('input.txt', 'r+', (err, fd) => {
	if(err) return console.log('Open file failed');

	console.log('Open file successful!', fd);
	

	// 截取内容
	console.log('cut after 10 bytes to the end!');
	fs.ftruncate(fd, 10, err => {
		if(err) return console.log('Cut file failed!');

		console.log('Cut file successful!');

		// 读取文件
		console.log('Read the same file!');
		fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
			if(err) return console.log('Read file failed!');

			// 仅输出读取的字节
			if(bytes > 0) {
				console.log(buf.slice(0, bytes).toString());
			}

			// 关闭文件
			fs.close(fd, err => {
				if(err) return console.log('Close file failed!');

				console.log('Close file successful!');
			})

		})
	})
});
