// �ļ��� ͬ��  �첽 ��ȡ

const fs = require('fs');

// �첽��ȡ
fs.readFile('input.txt', (err, data) => {
	if(err) return console.log(err.stack);

	console.log('async read: ' + data.toString());	
})

// ͬ����ȡ
let data = fs.readFileSync('input.txt')
console.log('sync read: ' + data.toString());

console.log('The program is finished!');
