// 创建一个长度为 10 、且用 0 填充的 Buffer.
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10 、且用 0x1填充的 Buffer.
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10 、且未初始化的 Buffer.
// 这个方法比调用 Buffer.alloc() 更快�.
// 但返回的 Buffer 实例可能包含旧数据
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer.
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer.
const buf5 = Buffer.from('test');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer.
const buf6 = Buffer('test', 'latin1');
console.log(buf6);

// buf.write()
const buf7 = Buffer.alloc(5);
const len = buf7.write('www.runoob.com');
console.log('写入字节数： ' + len);
console.log(buf7.toString('utf-8'));

const json = JSON.stringify(buf7);
console.log(json);

const copy = JSON.parse(json, (key, value) => {
	return value && value.type === 'Buffer' ?
		Buffer.from(value.data) : 
		value;
});
console.log(copy);

var buffer1 = Buffer.from('菜鸟教程');
var buffer2 = Buffer.from('www.runoob.com');
var buffer3 = Buffer.concat([buffer1, buffer2], 10);
console.log('buffer3 内容： ' + buffer3.toString());

var buffer4 = Buffer.from('qABC');
var buffer5 = Buffer.from('ABCD');
var result = buffer4.compare(buffer5);

if(result < 0) {
	console.log(buffer4 + ' 在 ' + buffer5 + ' 之前before ');
}else if(result == 0) {
	console.log(buffer4 + ' 在 ' + buffer5 + ' 相同same ');
}else if(result > 0) {
	console.log(buffer4 + ' 在 ' + buffer5 + ' 之后end ');
}else {
	console.log('NO');
}

var buf10 = Buffer.from('abcdefghijkl');
var buf11 = Buffer.from('ROUOOB');

// 将 bu11 插入到 buf10 指定位置上
buf11.copy(buf10, 2);

console.log(buf10.toString());
