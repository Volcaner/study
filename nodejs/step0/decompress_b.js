// ���ܴ��ڸ���״̬�� ��������׷�Ӳ��������

var fs = require('fs');
var read = fs.createReadStream('input.txt');

var write = fs.createWriteStream('output3.txt', {'flags' : 'a'});

// �ܵ�����д����
read.pipe(write);

console.log('finished!');
