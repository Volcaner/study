// 文件的 同步  异步 读取

const fs = require('fs');

// 异步读取
fs.readFile('input.txt', (err, data) => {
	if(err) return console.log(err.stack);

	console.log('async read: ' + data.toString());	
})

// 同步读取
let data = fs.readFileSync('input.txt')
console.log('sync read: ' + data.toString());

console.log('The program is finished!');
