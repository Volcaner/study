// д����

var fs = require('fs');
var data = 'www.rynoob.com';

// ����һ������д�������д�뵽�ļ� output.txt ��
var writerStream = fs.createWriteStream('output.txt');

// ʹ�� utf-8 ����д������
writerStream.write(data, 'UTF8');

// ����ļ�ĩβ
writerStream.end();

// �������¼� --> data, end, error
writerStream.on('finish', function() {
	console.log('write success!');
});

writerStream.on('error',function(err) {
	console.log(err.stack);
});

// cat output.txt

console.log('program is finished!');
