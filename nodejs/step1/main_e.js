// ������ն�
process.stdout.write('Hello World!' + '\n');

// ͨ��������ȡ
process.argv.forEach(function(val, index, array) {
	console.log(index + ': ' + val);
});

// ��ȡִ��·��
console.log(process.execPath);

// ƽ̨��Ϣ
console.log(process.flatform);

// �����ǰĿ¼
console.log('current file: ' + process.cwd());

// �����ǰ�汾
console.log('cur version: ' + process.version);

// ����ڴ�ʹ�����
console.log('memory: ', process.memoryUsage());


process.on('exit', function(code) {
	// ���´�����Զ����ִ��
	setTimeout(function() {
		console.log('�Ĵ��벻��ִ�У�');
	}, 0);

	console.log('�˳���Ϊ��', code);
});

console.log('The program is finished!');
