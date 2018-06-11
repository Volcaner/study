// ����һ������Ϊ 10 ������ 0 ���� Buffer.
const buf1 = Buffer.alloc(10);

// ����һ������Ϊ 10 ������ 0x1���� Buffer.
const buf2 = Buffer.alloc(10, 1);

// ����һ������Ϊ 10 ����δ��ʼ���� Buffer.
// ��������ȵ��� Buffer.alloc() ����.
// �����ص� Buffer ʵ�����ܰ���������
// �����Ҫʹ�� fill() �� write() ��д��
const buf3 = Buffer.allocUnsafe(10);

// ����һ������ [0x1, 0x2, 0x3] �� Buffer.
const buf4 = Buffer.from([1, 2, 3]);

// ����һ������ UTF-8 �ֽ� [0x74, 0xc3, 0xa9, 0x73, 0x74] �� Buffer.
const buf5 = Buffer.from('test');

// ����һ������ Latin-1 �ֽ� [0x74, 0xe9, 0x73, 0x74] �� Buffer.
const buf6 = Buffer('test', 'latin1');
console.log(buf6);

// buf.write()
const buf7 = Buffer.alloc(5);
const len = buf7.write('www.runoob.com');
console.log('д���ֽ����� ' + len);
console.log(buf7.toString('utf-8'));

const json = JSON.stringify(buf7);
console.log(json);

const copy = JSON.parse(json, (key, value) => {
	return value && value.type === 'Buffer' ?
		Buffer.from(value.data) : 
		value;
});
console.log(copy);

var buffer1 = Buffer.from('����̳�');
var buffer2 = Buffer.from('www.runoob.com');
var buffer3 = Buffer.concat([buffer1, buffer2], 10);
console.log('buffer3 ���ݣ� ' + buffer3.toString());

var buffer4 = Buffer.from('qABC');
var buffer5 = Buffer.from('ABCD');
var result = buffer4.compare(buffer5);

if(result < 0) {
	console.log(buffer4 + ' �� ' + buffer5 + ' ֮ǰbefore ');
}else if(result == 0) {
	console.log(buffer4 + ' �� ' + buffer5 + ' ��ͬsame ');
}else if(result > 0) {
	console.log(buffer4 + ' �� ' + buffer5 + ' ֮��end ');
}else {
	console.log('NO');
}

var buf10 = Buffer.from('abcdefghijkl');
var buf11 = Buffer.from('ROUOOB');

// �� bu11 ���뵽 buf10 ָ��λ����
buf11.copy(buf10, 2);

console.log(buf10.toString());
