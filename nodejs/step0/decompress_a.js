// �ܵ������� output.txt ��������ݣ�������ԭ����

let fs = require('fs');
let data = '';
let data2 = '���С��������ĺÿɰ���';

// 1.��ȡ��
// �����ɶ���
let readerStream = fs.createReadStream('input.txt');
// ���� utf-8 ����
readerStream.setEncoding('UTF8');
// �������¼�
readerStream.on('data', chunk => data += chunk);
readerStream.on('end', () => writeS(data));
readerStream.on('error', err => console.log(err.stack));
console.log('program1 is finished!');

// 2.д����
// �����ɶ���
let writeS = dataS => {
	let writerStream = fs.createWriteStream('output2.txt');
	// ʹ�� utf-8 д����
	writerStream.write(data2+dataS, 'UTF8');
	// ����ļ�ĩβ
	writerStream.end();
	// �����¼���
	writerStream.on('finish', () => console.log('writed successfully!'));
	writerStream.on('error', err => console.log(err.stack));
	console.log('program2 is finished!');
}
