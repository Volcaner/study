// 读取文件目录

const fs = require('fs');

fs.readdir('/', (err, files) => {
	if(err) return console.log(err);

	files.forEach(file => console.log(file));
});
