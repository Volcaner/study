// �ܵ���

var fs = require('fs');

// ����һ���ɶ���
var readerStream = fs.createReadStream('input.txt');

// ����һ����д��
var writerStream = fs.createWriteStream('output2.txt');

// �ܵ���д����
// ��ȡ inpt.txt �ļ����ݣ���������д�뵽 output.txt2 �ļ���
readerStream.pipe(writerStream);

console.log('program is finished!');
